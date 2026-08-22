import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import RequireRole from './components/RequireRole';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Explore from './pages/Explore';
import Journey from './pages/Journey';
import Visit from './pages/Visit';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import SalesDashboard from './pages/sales/SalesDashboard';
import SalesOrderDetail from './pages/sales/SalesOrderDetail';

const SALES_ROLES = ['SALES_MANAGER', 'SYSTEM_ADMIN'];

function App() {
  return (
    <AuthProvider>
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
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
                <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
                <Route path="/order-confirmation" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sales" element={<RequireRole roles={SALES_ROLES}><SalesDashboard /></RequireRole>} />
                <Route path="/sales/orders/:id" element={<RequireRole roles={SALES_ROLES}><SalesOrderDetail /></RequireRole>} />
              </Routes>
            </main>
            <div style={{ height: '3rem', backgroundColor: 'var(--color-alabaster)' }} />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
