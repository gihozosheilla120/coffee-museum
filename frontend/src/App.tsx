import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Visit from './pages/Visit';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{ backgroundColor: '#00273D', color: 'white', padding: '1rem' }}>
          <nav style={{ display: 'flex', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Rwanda Coffee Museum</Link>
            <Link to="/coffee-journey" style={{ color: 'white', textDecoration: 'none' }}>Coffee Journey</Link>
            <Link to="/visit" style={{ color: 'white', textDecoration: 'none' }}>Plan Visit</Link>
            <Link to="/marketplace" style={{ color: 'white', textDecoration: 'none' }}>Marketplace</Link>
          </nav>
        </header>

        <main style={{ flex: 1, maxWidth: '1200px', margin: '2rem auto', width: '100%', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffee-journey" element={<Journey />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </main>

        <footer style={{ backgroundColor: '#111922', color: '#D1D9E0', padding: '2rem', textAlign: 'center', marginTop: 'auto' }}>
          <p>&copy; {new Date().getFullYear()} Rwanda Coffee Museum (Nyanza). All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
