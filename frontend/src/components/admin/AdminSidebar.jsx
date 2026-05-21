import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();
  
  const sidebarLinks = [
    { id: 'add-truck', label: 'Add Product', path: '/admin/addVehicle' },
    { id: 'vehicles', label: 'Vehicles', path: '/admin/vehicles' },
    { id: 'orders', label: 'Orders', path: '/admin/orders' },
    { id: 'userlog', label: 'User Log', path: '/admin/userlog' }
  ];

  return (
    <aside className="admin-sidebar">
      {sidebarLinks.map((link) => (
        <Link 
          key={link.id} 
          to={link.path} 
          className={location.pathname === link.path ? 'active' : ''}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}