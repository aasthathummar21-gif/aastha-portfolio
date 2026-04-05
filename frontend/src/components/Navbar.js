import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: '18px 40px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid #222' : 'none',
    transition: 'all 0.3s ease'
  };

  const logoStyle = {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800, fontSize: '22px',
    background: 'linear-gradient(135deg, #ff3cac, #784ba0, #2b86c5)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    textDecoration: 'none'
  };

  const links = [
    { path: '/',         label: 'Home'     },
    { path: '/about',    label: 'About'    },
    { path: '/projects', label: 'Projects' },
    { path: '/contact',  label: 'Contact'  },
  ];

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>Aastha.</Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none',
                   margin: 0, padding: 0 }}
          className="desktop-nav">
        {links.map(link => (
          <li key={link.path}>
            <Link to={link.path} style={{
              color: location.pathname === link.path ? '#ff3cac' : '#ccc',
              textDecoration: 'none', fontSize: '15px', fontWeight: 500,
              transition: 'color 0.2s'
            }}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {/* Hamburger for mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none',
                 color: 'white', fontSize: '24px', cursor: 'pointer' }}
        className="hamburger">☰</button>

      {/* Mobile menu */}
      {menuOpen && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#111', listStyle: 'none', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {links.map(link => (
            <li key={link.path}>
              <Link to={link.path} style={{
                color: location.pathname === link.path ? '#ff3cac' : '#ccc',
                textDecoration: 'none', fontSize: '18px'
              }}>{link.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;