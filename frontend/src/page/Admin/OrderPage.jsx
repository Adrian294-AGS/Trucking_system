import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../hooks/useUserAuth';
import WarningPage from '../../components/WarningPage';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { accessToken, authLoading } = useUserAuth();
  const [order, setOrder] = useState([]);

  const formatCurrency = (amount) => `₱${amount.toLocaleString()}`;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if(!accessToken) return (<WarningPage />);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/getOrders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          credentials: "include"
        });

        const result = await res.json();
        setOrder(result.vehicle);
      } catch (error) {
        console.log("fetchOrders ERROR: ", error);
      }
    }
    fetchOrders();
  }, []);

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
            {order.map((t) => (
              <tr key={t.trip_id}>
                <td>{t.trip_id}</td>
                <td>{t.username}</td>
                <td>{t.model}</td>
                <td>{formatDate(t.pickup_date)}</td>
                <td>{formatDate(t.return_date)}</td>
                <td>{formatCurrency(t.amount)}</td>
                <td>
                  <span className={`status-badge ${t.status}`}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => navigate("/editOrder", {state: {status: t.status, model: t.model, pickup_date: t.pickup_date, return_date: t.return_date, pickup_location: t.pickup_location, note: t.note}})}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}