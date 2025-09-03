import { useParams, useSearchParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

function ProductDetail() {
  const { id, slug } = useParams();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Trouver le produit par slug ou id
  const productFromSlug = useMemo(() => {
    if (!slug) return null;
    return products.find(
      (p) => p.slug === slug || (Array.isArray(p.variantSlugs) && p.variantSlugs.includes(slug))
    );
  }, [slug]);

  const product = productFromSlug || products.find((p) => String(p.id) === String(id));

  // Déduire l'index de variante (via slug en priorité), sinon query ?size=, sinon 0
  const sizeInfo = useMemo(() => {
    if (!product) return { index: 0, label: null };
    // 1) via slug exact
    if (slug && Array.isArray(product.variantSlugs)) {
      const i = product.variantSlugs.indexOf(slug);
      if (i >= 0) {
        return {
          index: i,
          label: Array.isArray(product.sizes) ? product.sizes[i] : null,
        };
      }
    }
    // 2) via query ?size=
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
  }, [product, slug, searchParams]);

  // Image courante
  const currentImage = useMemo(() => {
    if (!product) return null;
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[sizeInfo.index] || product.images[0];
    }
    return product?.image || null;
  }, [product, sizeInfo.index]);

  // Libellé de taille
  const sizeLabel = useMemo(() => sizeInfo.label, [sizeInfo.label]);

  // URL canonique
  const base = "https://natureolivart.netlify.app";
  const preferredSlug =
    slug || (product?.variantSlugs?.[sizeInfo.index]) || product?.slug || (product ? `products/${product.id}` : "");
  const canonicalUrl = preferredSlug.startsWith("cuillere-")
    ? `${base}/produit/${preferredSlug}`
    : `${base}/${preferredSlug}`;

  // Contrôles quantité
  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(1, q - 1));

  // Ajout au panier + toast
  const handleAddToCart = () => {
    addItem(product, qty, { sizeLabel, image: currentImage });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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

  // SEO dynamiques + JSON-LD
  const pageTitle = `${product.name}${sizeLabel ? ` - ${sizeLabel}` : ""} | NaturOliv Art`;
  const metaDescription =
    product.description || `Découvrez ${product.name}${sizeLabel ? ` (${sizeLabel})` : ""} chez NaturOliv Art.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name + (sizeLabel ? ` (${sizeLabel})` : ""),
    description: product.description,
    image: currentImage ? [currentImage] : undefined,
    url: canonicalUrl,
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: "NaturOliv Art",
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg
                     bottom-4 left-1/2 -translate-x-1/2
                     md:top-4 md:right-4 md:bottom-auto md:left-auto md:translate-x-0"
        >
          Article ajouté au panier
        </div>
      )}
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
              <div className="inline-flex items-stretch border border-gray-300 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={dec}
                  className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-700"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value || "1", 10)))
                  }
                  className="w-20 md:w-16 text-center outline-none"
                  aria-label="Quantité"
                />
                <button
                  type="button"
                  onClick={inc}
                  className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-700"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
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
    </>
  );
}

export default ProductDetail;
