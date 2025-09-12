import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-wood-dark text-white p-4 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-title">
          NaturOliv Art
        </Link>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-white focus:outline-none"
            aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {darkMode ? (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <Link
            to="/cart"
            className="relative text-white focus:outline-none"
            aria-label="Panier"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="hover:text-wood-medium transition duration-300 dark:text-white dark:hover:text-wood-medium"
          >
            Accueil
          </Link>
          <Link
            to="/products"
            className="hover:text-wood-medium transition duration-300 dark:text-white dark:hover:text-wood-medium"
          >
            Nos pièces
          </Link>
          <Link
            to="/contact"
            className="hover:text-wood-medium transition duration-300 dark:text-white dark:hover:text-wood-medium"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="relative hover:text-wood-medium transition duration-300 dark:text-white dark:hover:text-wood-medium flex items-center gap-1"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {/* <span>Panier</span> */}
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="text-white focus:outline-none"
            aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {darkMode ? (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-wood-dark dark:bg-gray-700">
            <Link
              to="/"
              className="block px-3 py-3 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300 dark:hover:bg-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block px-3 py-3 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300 dark:hover:bg-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Nos pièces
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-3 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300 dark:hover:bg-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-3 text-white hover:bg-wood-medium hover:text-wood-dark rounded transition duration-300 dark:hover:bg-gray-600 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>Panier {count > 0 ? `(${count})` : ""}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
