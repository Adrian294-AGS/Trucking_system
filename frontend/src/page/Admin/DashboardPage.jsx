import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNotif } from "../../context/NotificationContext";
import WarningPage from "../../components/WarningPage";

export default function DashboardPage({ user, onLogout }) {
  const navigate = useNavigate();
  const { accessToken } = useUserAuth();
  const { update } = useNotif;
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [maintenanceTrucks, setMaintenanceTrucks] = useState([]);
  const [unavailableTrucks, setUnavailableTrucks] = useState([]);
  const [totalTruck, setTotalTruck] = useState([]);

  const fetchAllTruck = async () => {
    try {
      const res = await fetch("/api/truck/fetchAllTrucks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const result = await res.json();

      if (!result.success) {
        alert(result.message);
        return;
      }
      const trucks = result.trucks;
      setTotalTruck(trucks.length);
      setAvailableTrucks(trucks.filter((truck) => truck.status == "available"));
      setUnavailableTrucks(
        trucks.filter((truck) => truck.status == "unavailable"),
      );
      setMaintenanceTrucks(
        trucks.filter((truck) => truck.status == "maintenance"),
      );
    } catch (error) {
      console.log("FetchAllTruck ERROR: ", error);
    }
  };

  if (!accessToken) return <WarningPage />

  useEffect(() => {
    fetchAllTruck();
  }, [update]);

  return (
    <div className="app-layout">
      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">{totalTruck}</div>
          <div className="stat-label">Total Vehicle</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{availableTrucks.length}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{maintenanceTrucks.length}</div>
          <div className="stat-label">In Maintenance</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{unavailableTrucks.length}</div>
          <div className="stat-label">Unavailable</div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="main-content">
        <div className="status-row">
          {/* Maintenance */}
          <div className="status-col">
            <span className="status-badge badge-yellow">Under Maintenance</span>
            <div className="truck-grid grid-2col">
              {maintenanceTrucks.map((t, i) => (
                <div key={i} className="truck-slot maintenance">
                  <div className="slot-header">Under maintenance</div>
                  <div className="truck-img">
                    <img src={`${import.meta.env.VITE_API_URL}/${t.photo_url}`} alt="Truck" onError={(e) => (e.target.src = 'https://placehold.co/220x160/1e3050/ffffff?text=No+Image')}/>
                  </div>
                  <div className="slot-footer">Brand: {t.brand}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Unavailable */}
          <div className="status-col">
            <span className="status-badge badge-red">Unavailable</span>
            <div className="truck-grid grid-2col">
              {unavailableTrucks.map((t, i) => (
                <div key={i} className="truck-slot unavailable">
                  <div className="slot-header">Unavailable</div>
                  <div className="truck-img">
                    <img src={`${import.meta.env.VITE_API_URL}/${t.photo_url}`} alt="Truck"  onError={(e) => (e.target.src = 'https://placehold.co/220x160/1e3050/ffffff?text=No+Image')}/>
                  </div>
                  <div className="slot-footer">Brand: {t.brand}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available */}
        <h2 className="section-title" style={{color: "green"}}>Available Trucks</h2>
        <div className="truck-grid">
          {availableTrucks.map((t, i) => (
            <Link key={i} to="/trucks" className="truck-link">
              <div className="truck-slot available">
                <div className="slot-header">Available</div>
                <div className="truck-img">
                  <img src={`${import.meta.env.VITE_API_URL}/${t.photo_url}`} alt="Truck" onError={(e) => (e.target.src = 'https://placehold.co/220x160/1e3050/ffffff?text=No+Image')}/>
                </div>
                <div className="slot-footer">Brand: {t.brand}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>SSK TRUCKING</span> · © 2026 All Rights Reserved · Built for
        Professionals
      </footer>
    </div>
  );
}
