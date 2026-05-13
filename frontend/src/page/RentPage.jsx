import React from "react";
import { useState } from "react";
import "@/assets/style/rentPage.css";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate, useLocation, data } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useNotif from "../hooks/useNotif";
import { useToast } from "../context/ToastContext";

export default function RentPage() {
  const navigate = useNavigate();
  const { sendUpdate } = useNotif();
  const { showToast } = useToast();
  const location = useLocation();
  const { truck_id, truck_brand, truck_plate, truck_photo } = location.state;
  const { accessToken, user } = useUserAuth();
  const [formData, setFormData] = useState({
    pickup_date: "",
    return_date: "",
    pickup_location: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDates = () => {
    setError("");
    const { pickup_date, return_date } = formData;
    if (!pickup_date || !return_date) return false;
    const pickup = new Date(pickup_date);
    const returns = new Date(return_date);
    const now = new Date();
    if (returns <= pickup) {
      setError("Return date must be on or after pickup date.");
      return false;
    } else if (pickup < now) {
      setError("PickUp date must be on or after todys date.");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateDates()) {
      return;
    }

    

    formData.truck_id = truck_id;

    try {
      const res = await fetch("/api/truck/rentTruck", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await res.json();

      if (!result.success) {
        showToast("error", "ssk-trucking", result.message);
        setFormData({
          pickup_date: "",
          return_date: "",
          pickup_location: "",
          notes: "",
        });
        navigate(-1);
        return;
      }

      setFormData({
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        notes: "",
      });
      setIsLoading(true);
      sendUpdate();
    } catch (err) {
      setError(err.message || "Failed to process rental. Please try again.");
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate("/success", {
      state: {
        clientName: user.fullName,
        truck: {
          brand: truck_brand,
          plate: truck_plate,
          year: "2020",
          type: "Wing van",
          fuel: "Diesel",
        },
      },
    });
  };

  if (isLoading) {
    return (
      <LoadingPage
        onComplete={handleLoadingComplete}
        brand="SSK TRUCKING"
        tagline="Client Portal · Loading please wait..."
        tips={[
          "Revving up the engines...",
          "Checking vehicle availability...",
          "Syncing your account data...",
          "Almost there! Hang tight...",
        ]}
        duration={3000}
      />
    );
  }

  return (
    <div>
      <HomeNavbar user={user} />
      <main className="page">
        <div className="main-content">
          <h1 className="page-title">Rent a truck</h1>

          <div className="rent-layout">
            {/* TRUCK PREVIEW */}
            <div className="truck-preview">
              <div className="truck-preview-img">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${truck_photo}`}
                  alt="Isuzu Wing Truck"
                  onError={(e) => (e.target.src = 'https://placehold.co/220x160/1e3050/ffffff?text=No+Image')}
                />
              </div>
              <div className="truck-preview-info">
                <div className="truck-name">{truck_brand}</div>
                <div className="truck-plate">{truck_plate}</div>
              </div>
              <div className="truck-status">Available</div>
            </div>

            {/* RENT DETAILS FORM */}
            <div className="rent-details">
              <h2>Rent Details</h2>

              {error && <div className="form-error">{error}</div>}
              {success && (
                <div
                  className="form-error"
                  style={{
                    background: "#d4edda",
                    color: "#155724",
                    borderColor: "#c3e6cb",
                  }}
                >
                  {success}
                </div>
              )}

              <form id="rent-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="pickup-date">Pickup Date</label>
                  <div className="date-wrapper">
                    <input
                      type="date"
                      id="pickup-date"
                      name="pickup_date"
                      value={formData.pickup_date}
                      onChange={handleChange}
                      required
                    />
                    <span className="cal-icon">📅</span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="return-date">Return Date</label>
                  <div className="date-wrapper">
                    <input
                      type="date"
                      id="return-date"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleChange}
                      required
                    />
                    <span className="cal-icon">📅</span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="pickup-location">Pickup Location</label>
                  <input
                    type="text"
                    id="pickup-location"
                    name="pickup_location"
                    className="location-input"
                    placeholder="Enter Address"
                    value={formData.pickup_location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="optional...."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-rent-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "RENT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
