import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1, opts = {}) => {
    const sizeLabel = opts.sizeLabel || null;
    const imageOverride = opts.image;
    const uid = sizeLabel ? `${product.id}::${sizeLabel}` : String(product.id);

    setItems((prev) => {
      const idx = prev.findIndex((it) => it.uid === uid);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      const image =
        imageOverride ||
        (Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : product.image);
      return [
        ...prev,
        {
          uid, // identifiant unique (produit + taille)
          productId: product.id,
          name: product.name,
          size: sizeLabel || null,
          image,
          qty,
        },
      ];
    });
  };

  const updateQty = (uid, qty) => {
    setItems((prev) =>
      prev.map((it) => (it.uid === uid ? { ...it, qty: Math.max(1, qty) } : it))
    );
  };

  const removeItem = (uid) => {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const value = { items, addItem, updateQty, removeItem, clear, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
