import { products } from '../data/products';
import { useState } from 'react';

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-wood-dark">Nos Pièces Artisanales</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          product.images ? (
            product.images.map((img, index) => (
              <div key={`${product.id}-${index}`} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${product.name} ${product.sizes[index]}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-wood-light">
                  <h2 className="text-xl font-bold mb-2 text-wood-dark">{product.name}</h2>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Taille: {product.sizes[index]}</p>
                      {/* <p className="text-lg font-bold text-wood-dark mt-1">{product.price[index]} DT</p> */}
                    </div>
                    <button 
                      className="bg-wood-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
                      onClick={() => setSelectedProduct({ ...product, currentSize: index })}
                    >
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 bg-wood-light">
                <h2 className="text-xl font-bold mb-2 text-wood-dark">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Taille: {product.size}</p>
                    {/* <p className="text-lg font-bold text-wood-dark mt-1">{product.price} DT</p> */}
                  </div>
                  <button 
                    className="bg-wood-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Modal Détails */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <img 
              src={selectedProduct.images ? selectedProduct.images[selectedProduct.currentSize] : selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            {selectedProduct.sizes && <p className="text-gray-600">Taille: {selectedProduct.sizes[selectedProduct.currentSize]}</p>}
            {/* {selectedProduct.price && <p className="text-lg font-bold mt-1">{selectedProduct.price[selectedProduct.currentSize]} DT</p>} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
