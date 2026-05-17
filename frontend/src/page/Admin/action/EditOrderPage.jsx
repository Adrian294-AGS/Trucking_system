import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../../hooks/useUserAuth";
import { useToast } from "../../../context/ToastContext";
import { useNotif } from "../../../context/NotificationContext";
import WarningPage from "../../../components/WarningPage";

export default function EditOrderPage() {
  const navigate = useNavigate();
  const { update, sendUpdate, sendOrderUpdate } = useNotif();
  const { showToast } = useToast();
  const { accessToken } = useUserAuth();
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    transac_id: state.transac_id,
    pickupDate: state.pickup_date,
    returnDate: state.return_date,
    pickupLocation: state.pickup_location,
    notes: state.note,
    amount: state.amount,
    status: state.status,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/editOrders", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!result.success) {
        setFormData((prev) => ({ ...prev, amount: 0 }));
        showToast("warning", "Admin", result.message);
        return;
      }

      sendOrderUpdate(
        state.username,
        `${state.username} ${formData.status} Order`,
        state.UID,
        formData.status
      );

      setFormData((prev) => ({ ...prev }));
      showToast("success", "Admin", result.message);
      sendUpdate();
      navigate("/admin/orders");
    } catch (error) {
      console.log("EditOrderPage ERROR: ", error);
    }
  };

  if(!accessToken) return <WarningPage />

  return (
    <div className="admin-main">
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <span></span>Edit Order
        </h1>
      </div>

      <div className="edit-layout">
        {/* Left: Truck Preview */}
        <div className="truck-preview">
          <div className="status-bar available">Available</div>
          <img
            src={`${import.meta.env.VITE_API_URL}/${state.photo}`}
            alt="Truck Preview"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/220x160/1e3050/ffffff?text=No+Image")
            }
          />
        </div>

        {/* Right: Order Form */}
        <div className="order-form">
          <h2 className="form-section-title">Order Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="pickupDate">Pickup Date</label>
              <div className="date-input-wrap">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                />
                <span className="cal-icon">📅</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="returnDate">Return Date</label>
              <div className="date-input-wrap">
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                />
                <span className="cal-icon">📅</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pickupLocation">Pickup Location</label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter address..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional instructions..."
              />
            </div>

            <div className="amount-status-row">
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="₱ 0.00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/admin/orders")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
