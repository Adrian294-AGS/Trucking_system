import React, { useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useToast } from "../context/ToastContext";
import useNotif from "../hooks/useNotif";

export default function Orders() {
  const { user, accessToken } = useUserAuth();
  const { showToast } = useToast();
  const {update, sendUpdate} = useNotif();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [change, setChange] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/truck/getOrders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOrder(result.orders);
    } catch (error) {
      console.log("fetchOrders ERROR: ", error);
    }
  };

  const handleCancel = async (trip_id, truck_id) => {
    try {
      const res = await fetch(`/api/truck/deleteOrder`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({trip_id, truck_id})
      });
      const result = await res.json();
      if(!result.success) return showToast("warning", "Admin Orders", result.message);
      sendUpdate();
      showToast("info", "Admin Orders", result.message);
      setChange((prev) => !prev);
    } catch (error) {
      console.log("Hande Delete ERROR: ", error);
    }
  }

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    fetchOrders();
  }, [update]);

  return (
    <div>
      <HomeNavbar user={user} />
      <main className="page">
        <div className="page-content">
          <h1 className="page-title">Your order</h1>

          <div className="order-layout">
            {order.length > 0 ? (
              order.map((order, id) => (
                <div key={id}>
                  <div className="truck-slot">
                    <div className="truck-img">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${order.photo_url}`}
                        alt={order.model}
                      />
                    </div>
                    <div className="truck-info">
                      <div className="truck-name">{order.model}</div>
                      <div className="truck-plate">
                        Plate: {order.plate_number}
                      </div>
                    </div>
                  </div>

                  <div className="order-form-box">
                    <div className="form-title">Rent Details</div>

                    <label>Pickup Date</label>
                    <div className="input-row">
                      <input
                        type="date"
                        className="form-input"
                        value={order.pickup_date}
                        readOnly
                      />
                      <span className="cal-icon">📅</span>
                    </div>

                    <label>Return Date</label>
                    <div className="input-row">
                      <input
                        type="date"
                        className="form-input"
                        value={order.return_date}
                        readOnly
                      />
                      <span className="cal-icon">📅</span>
                    </div>

                    <label>Pickup Location</label>
                    <input
                      type="text"
                      className="form-input location-input"
                      placeholder="Enter Address"
                      value={order.pickup_location}
                      readOnly
                    />

                    <label>Notes</label>
                    <textarea
                      className="form-textarea"
                      value={order.note}
                      readOnly
                    />

                    {order.status === "Approved" || order.status === "Complete" ? (
                      <button type="submit" className="btn-rent-submit">
                        {order.status}👌
                      </button>
                    ) : (
                      <div>
                        <button type="submit" className="btn-rent-submit" style={{backgroundColor: "red"}}>
                        ...Pending
                      </button>
                       <button type="submit" className="btn-rent-submit" onClick={() => handleCancel(order.trip_id, order.truck_id)}>
                        Cancel
                      </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>NO ORDER</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
