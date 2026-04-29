import React from "react";
import { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import truckingLogo from "@/assets/truck-highway-sunny-sky.jpg";
import { useNavigate } from "react-router-dom";

export default function Truck() {
    const navigate = useNavigate();
  const [trucks, setTrucks] = useState([
    { id: 1, brand: "Isuzu", type: "Wing Van" },
    { id: 2, brand: "Hino", type: "Dump Truck" },
    { id: 3, brand: "Mitsubishi", type: "Refrigerated" },
    { id: 4, brand: "Foton", type: "Flatbed" },
    { id: 5, brand: "Isuzu", type: "Cargo Van" },
    { id: 6, brand: "Hino", type: "Wing Van" },
    { id: 7, brand: "Mitsubishi", type: "Dump Truck" },
    { id: 8, brand: "Foton", type: "Refrigerated" },
  ]);

  const handleRent = (id) => {
    console.log("Initiating rent flow for truck:", id);
    navigate("/rent");
  };

  return (
    <div>
      <HomeNavbar />
      <main className="page">
        <div className="main-content">
          <h2 className="status">Available trucks</h2>

          <div className="truck-grid">
            {trucks.map((truck) => (
              <div key={truck.id} className="truck-slot available">
                <div className="slot-header">Available</div>
                <div className="truck-img">
                  <img
                    src={truckingLogo}
                    alt={`${truck.brand} ${truck.type}`}
                  />
                </div>
                <div className="truck-info">
                  <div className="info-row">
                    <strong>Brand:</strong> {truck.brand}
                  </div>
                  <div className="info-row">
                    <strong>Type:</strong> {truck.type}
                  </div>
                  <button
                    className="rent-button"
                    onClick={() => handleRent(truck.id)}
                  >
                    RENT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
