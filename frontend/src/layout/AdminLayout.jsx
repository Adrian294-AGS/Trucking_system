import React from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';


export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
      <footer className="admin-footer">
        SSK TRUCKING · <strong>© 2026</strong> All Rights Reserved · Built for Professionals
      </footer>
    </div>
  );
}