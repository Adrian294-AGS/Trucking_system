import React from "react";
import truckImg from "@/assets/truck-highway-sunny-sky.jpg";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useNotif from "../hooks/useNotif";

export default function Home() {
  const { accessToken, authLoading, user } = useUserAuth();
  const navigate = useNavigate();
  const { update } = useNotif();
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [maintenanceTrucks, setMaintenanceTrucks] = useState([]);
  const [unavailableTrucks, setUnavailableTrucks] = useState([]);
  const [totalTruck, setTotalTruck] = useState([]);
  const [message, setMessage] = useState("");

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
      setAvailableTrucks(
        trucks.filter(
          (truck) => truck.status == "available"
        ),
      );
      setUnavailableTrucks(
        trucks.filter(
          (truck) =>
            truck.status == "unavailable" 
        ),
      );
      setMaintenanceTrucks(
        trucks.filter((truck) => truck.status == "maintenance"),
      );
    } catch (error) {
      console.log("FetchAllTruck ERROR: ", error);
    }
  };
  useEffect(() => {
    if (authLoading || !accessToken) return;
    fetchAllTruck();
  }, [authLoading, update]);

  
  return (
    <div>
      <HomeNavbar user={user} />
      <main className="page">
        {/* BANNER */}
        <div className="banner">
          <div className="banner-content">
            <h1>Truck rentals for every need.</h1>
            <button
              className="btn-rent"
              onClick={() => (navigate("/trucks"))}
            >
              Rent now!
            </button>
          </div>
        </div>

        {/* STATS BAR */}
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

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="status-row">
            {/* Available */}
            <h2 className="section-title" style={{ color: "green"}}>
              Available Trucks
            </h2>
            <div className="truck-grid">
              {availableTrucks.map((t, i) => (
                <div key={i} className={t.on_trip == 1 ? "truck-slot reserved" : "truck-slot available"}>
                  <div className="slot-header">{t.on_trip == 1 ? "Reserved" : "Available"}</div>
                  <div className="truck-img">
                    <img
                      src={
                        `${import.meta.env.VITE_API_URL}/${t.photo_url}` ||
                        `${truckImg}`
                      }
                      alt={`Truck `}
                    />
                  </div>
                  <div className="slot-footer">Brand: {t.brand}</div>
                </div>
              ))}
            </div>
            {/* Maintenance */}
            <div className="status-col">
              <span className="status-badge badge-yellow">
                Under Maintenance
              </span>
              <div className="truck-grid truck-grid-2col">
                {maintenanceTrucks.map((t, i) => (
                  <div key={i} className={`truck-slot maintenance`}>
                    <div className="slot-header">Under maintenance</div>
                    <div className="truck-img">
                      <img
                        src={
                          `${import.meta.env.VITE_API_URL}/${t.photo_url}` ||
                          `${truckImg}`
                        }
                        alt={`Truck `}
                      />
                    </div>
                    <div className="slot-footer">Brand: {t.brand}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unavailable */}
            <div className="status-col">
              <span className="status-badge badge-red">Unavailable</span>
              <div className="truck-grid truck-grid-2col">
                {unavailableTrucks.map((t, i) => (
                  <div key={i} className={`truck-slot unavailable`}>
                    <div className="slot-header">Unavailable Truck</div>
                    <div className="truck-img">
                      <img
                        src={
                          `${import.meta.env.VITE_API_URL}/${t.photo_url}` ||
                          `${truckImg}`
                        }
                        alt={`Truck `}
                      />
                    </div>
                    <div className="slot-footer">Brand: {t.brand}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
    
  
}
