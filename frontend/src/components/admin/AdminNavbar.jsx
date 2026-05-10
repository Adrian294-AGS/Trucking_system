import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import truckingLogo from '@/assets/ssk_trucking_white.png';

export default function AdminNavbar({ onLogout }) {
  const location = useLocation();
  
  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'vehicles', label: 'Vehicles', path: '/admin/vehicles' },
    { id: 'orders', label: 'Orders', path: '/admin/orders' },
    { id: 'userlog', label: 'User Log', path: '/admin/userlog' }
  ];

  return (
    <nav className="admin-navbar">
      <Link to="/admin/dashboard" className="logo">
        <img src={truckingLogo} alt="SSK Logo" />
        <span className="brand-title">Admin Portal</span>
      </Link>

      <div className="admin-nav-links">
        {navLinks.map((link) => (
          <Link 
            key={link.id} 
            to={link.path} 
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}