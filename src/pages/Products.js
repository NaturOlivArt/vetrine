import { products } from "../data/products";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

function Products() {
  const [filters, setFilters] = useState({
    size: "",
    priceRange: "",
  });

  // Extraire toutes les tailles uniques
  // const allSizes = useMemo(() => {
  //   const sizes = new Set();
  //   products.forEach(product => {
  //     if (Array.isArray(product.sizes)) {
  //       product.sizes.forEach(size => sizes.add(size));
  //     } else if (product.size) {
  //       sizes.add(product.size);
  //     }
  //   });
  //   return Array.from(sizes).sort();
  // }, []);

  // Filtrer les produits
  const filteredProducts = useMemo(() => {
    return products.flatMap(product => {
      if (Array.isArray(product.images)) {
        return product.images.map((img, index) => {
          const size = product.sizes?.[index] || "";
          const price = product.prices?.[index] || 0;
          
          // Appliquer les filtres
          if (filters.size && size !== filters.size) return null;
          if (filters.priceRange) {
            const [min, max] = filters.priceRange.split("-").map(Number);
            if (price < min || (max && price > max)) return null;
          }
          
          return { ...product, image: img, size, price, index };
        }).filter(Boolean);
      }
      
      // Appliquer les filtres pour les produits sans variantes
      if (filters.size && product.size !== filters.size) return [];
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (product.price < min || (max && product.price > max)) return [];
      }
      
      return [product];
    });
  }, [filters]); // Suppression de la dépendance inutile 'products'

  // Gérer les changements de filtres
  // const handleFilterChange = (filterName, value) => {
  //   setFilters(prev => ({ ...prev, [filterName]: value }));
  // };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-wood-dark dark:text-wood-medium font-title">
        Nos Pièces Artisanales
      </h1>
      
      {/* Filtres */}
      {/* <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 font-title">Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/* Filtre par taille */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">Taille</label>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange("size", e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Toutes les tailles</option>
              {allSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div> */}
    
          {/* Filtre par prix */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">Prix</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Tous les prix</option>
              <option value="0-30">Moins de 30€</option>
              <option value="30-50">30€ - 50€</option>
              <option value="50-100">50€ - 100€</option>
              <option value="100-">Plus de 100€</option>
            </select>
          </div> */}
        {/* </div>
      </div> */}
      
      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, idx) => (
          <div
            key={`${product.id}-${product.index || idx}`}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 product-card"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="h-56 md:h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6 bg-wood-light dark:bg-gray-700">
              <h2 className="text-xl font-bold mb-2 text-wood-dark dark:text-wood-light font-title">
                {product.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taille: {product.size || (product.sizes && product.sizes[product.index]) || ""}
                  </p>
                </div>
                <Link
                  to={`/produit/${product.variantSlugs?.[product.index] || `${product.slug}-${product.index || 0}`}`}
                  className="bg-wood-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300 dark:bg-wood-medium dark:text-gray-900"
                >
                  Détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg">Aucun produit ne correspond à vos critères de recherche.</p>
          <button 
            onClick={() => setFilters({ size: "", priceRange: "" })}
            className="mt-4 bg-wood-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300 dark:bg-wood-medium dark:text-gray-900"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
