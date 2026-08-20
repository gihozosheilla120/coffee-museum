import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Explore from './pages/Explore';
import Journey from './pages/Journey';
import Visit from './pages/Visit';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/coffee-journey" element={<Journey />} />
              <Route path="/visit" element={<Visit />} />
              <Route path="/community" element={<Community />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <div style={{ height: '3rem', backgroundColor: 'var(--color-alabaster)' }} />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
