import React from 'react';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
  // 🔹 Replace with API fetch in production
  const orders = [
    { id: 1, customer: 'alexandrie', truck: 'Isuzu', pickup: '2026-05-01', return: '2026-05-10', total: 10000, status: 'pending' },
    { id: 2, customer: 'adrian', truck: 'Hino', pickup: '2026-03-25', return: '2026-03-29', total: 20000, status: 'active' },
    { id: 3, customer: 'maria', truck: 'Mitsubishi', pickup: '2026-04-10', return: '2026-04-15', total: 15000, status: 'complete' }
  ];

  const formatCurrency = (amount) => `₱${amount.toLocaleString()}`;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title"><span></span>Rental Orders</h1>
        <Link to="/admin/add-order" className="btn-edit" style={{ padding: '8px 16px' }}>+ Add Order</Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Truck</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.truck}</td>
                <td>{formatDate(order.pickup)}</td>
                <td>{formatDate(order.return)}</td>
                <td>{formatCurrency(order.total)}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/orders/edit/${order.id}`} className="btn-edit">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}