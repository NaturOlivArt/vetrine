import { useParams, useSearchParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => String(p.id) === String(id));

  // ✅ calcul variant robuste (index numérique ou libellé, et bornage)
  const sizeInfo = useMemo(() => {
    if (!product) return { index: 0, label: null };

    const imagesCount = Array.isArray(product.images) ? product.images.length : 0;
    const raw = searchParams.get("size");
    let index = 0;

    if (raw != null) {
      const byIndex = Number.parseInt(raw, 10);
      if (!Number.isNaN(byIndex)) {
        index = Math.min(Math.max(0, byIndex), Math.max(0, imagesCount - 1));
      } else if (Array.isArray(product.sizes)) {
        const decoded = decodeURIComponent(raw).toLowerCase();
        const found = product.sizes.findIndex((s) => s.toLowerCase() === decoded);
        index = found >= 0 ? found : 0;
      }
    }

    const label = Array.isArray(product.sizes) ? product.sizes[index] : product.size || null;
    return { index, label };
  }, [product, searchParams]);

  // ✅ image actuelle avec fallback sûr
  const currentImage = useMemo(() => {
    if (!product) return null;
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[sizeInfo.index] || product.images[0];
    }
    return product?.image || null;
  }, [product, sizeInfo.index]);

  // ✅ libellé de taille
  const sizeLabel = useMemo(() => sizeInfo.label, [sizeInfo.label]);

  // ❌ si pas de produit
  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p className="text-xl">Produit introuvable.</p>
        <Link
          to="/products"
          className="text-wood-dark hover:underline mt-4 inline-block"
        >
          ← Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image à gauche */}
        <div>
          {currentImage && (
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          )}
        </div>

        {/* Titre + description à droite */}
        <div>
          <h1 className="text-3xl font-bold text-wood-dark mb-2">{product.name}</h1>
          {sizeLabel && <p className="text-gray-600 mb-4">Taille: {sizeLabel}</p>}
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <label className="text-gray-700">Quantité</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
              className="w-24 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <button
            onClick={() => addItem(product, qty, { sizeLabel, image: currentImage })}
            className="bg-wood-dark text-white px-6 py-3 rounded hover:bg-opacity-90 transition duration-300 mr-4"
          >
            Ajouter au panier
          </button>

          <Link to="/cart" className="text-wood-dark hover:underline">
            Voir le panier →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
