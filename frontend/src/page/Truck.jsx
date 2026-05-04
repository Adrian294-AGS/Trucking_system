import React from "react";
import { useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar";
import truckingLogo from "@/assets/truck-highway-sunny-sky.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";

export default function Truck() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { accessToken, user } = useUserAuth();
  const [trucks, setTrucks] = useState([]);

  const handleRent = (truckId, brand, plateNumber, photo) => {
    navigate("/rent", {state: {truck_id: truckId, truck_brand: brand, truck_plate: plateNumber, truck_photo: photo}});
  };

  const fetchAvailableTrucks = async () => {
    try {
      const res = await fetch("/api/truck/fetchAvailableTrucks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
      const availableTrucks = await res.json();
      if(!availableTrucks.success){
        setError(availableTrucks.message);
        return;
      }
      setTrucks(availableTrucks.availableTruck);
    } catch (error) {
      console.log("fetchAvailableTrucks ERROR: ", error);
    }
  }
  
  useEffect(() => {
    if(!accessToken) return;
    fetchAvailableTrucks();
  }, [accessToken]);

  return accessToken ? (
    <div>
      <HomeNavbar user={user}/>
      <main className="page">
        <div className="main-content">
          <h2 className="status">Available trucks</h2>

          <div className="truck-grid">
            {trucks.map((truck) => (
              <div key={truck.truck_id} className="truck-slot available">
                <div className="slot-header">Available</div>
                <div className="truck-img">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${truck.photo_url}`}
                    alt={`${truck.brand} ${truck.truck_type}`}
                  />
                </div>
                <div className="truck-info">
                  <div className="info-row">
                    <strong>Brand:</strong> {truck.brand}
                  </div>
                  <div className="info-row">
                    <strong>Type:</strong> {truck.truck_type}
                  </div>

                 
                    <button
                    target="_blank"
                    className="rent-button"
                    onClick={() => handleRent(truck.truck_id, truck.brand, truck.plate_number, truck.photo_url)}
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
  ) : (
    <div>No Content</div>
  );
}
