import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./transitions.css";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* NEW: route SEO-friendly par slug */}
          <Route path="/produit/:slug" element={<ProductDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
