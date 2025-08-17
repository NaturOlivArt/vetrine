import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-wood-dark text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">NaturOliv Art</Link>
        
        {/* Menu mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-wood-medium transition duration-300">Accueil</Link>
          <Link to="/products" className="hover:text-wood-medium transition duration-300">Nos pièces</Link>
          <Link to="/contact" className="hover:text-wood-medium transition duration-300">Contact</Link>
        </div>
      </div>
      
      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-wood-dark">
            <Link 
              to="/" 
              className="block px-3 py-2 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Nos pièces
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;