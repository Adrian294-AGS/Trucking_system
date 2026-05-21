import React from "react";
import { useState } from "react";
import "@/assets/style/rentPage.css";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useNotif } from "../context/NotificationContext";
import { useToast } from "../context/ToastContext";
import WarningPage from "../components/WarningPage";

export default function RentPage() {
  const navigate = useNavigate();
  const { sendUpdate, sendUserLog } = useNotif();
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

  const [infoPickUp, setInfoPickUp] = useState({
    houseNumber: "",
    barangay: "",
    streetNumber: ""
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

  // ── NEW: Handle infoPickUp changes with validation ──
  const handleInfoPick = (e) => {
    const { name, value } = e.target;
    
    // Validate: only allow letters, numbers, spaces, and basic punctuation
    const isValid = /^[a-zA-Z0-9\s.,#/-]*$/.test(value);
    
    if (isValid || value === "") {
      setInfoPickUp((prev) => ({
        ...prev,
        [name]: value
      }));
    }
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
      setError("PickUp date must be on or after todays date.");
      return false;
    } else {
      return true;
    }
  };

  // ── NEW: Validate pickup info fields ──
  const validatePickupInfo = () => {
    const { houseNumber, barangay, streetNumber } = infoPickUp;
    
    // Check if required fields are filled
    if (!houseNumber || !barangay) {
      setError("House Number and Barangay are required.");
      return false;
    }
    
    // Validate format: alphanumeric + basic punctuation only
    const validPattern = /^[a-zA-Z0-9\s.,#/-]+$/;
    if (!validPattern.test(houseNumber) || !validPattern.test(barangay) || (streetNumber && !validPattern.test(streetNumber))) {
      setError("Please use only letters, numbers, and basic punctuation (., #, /, -).");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateDates()) {
      sendUserLog("Rent", "Failed", `${truck_brand}`, `${truck_plate}`);
      return;
    }
    
    // ── NEW: Validate pickup info before submit ──
    if (!validatePickupInfo()) {
      sendUserLog("Rent", "Failed", `${truck_brand}`, `${truck_plate}`);
      return;
    }

    formData.truck_id = truck_id;
    // ── NEW: Attach pickup info to form data ──
    formData.houseNumber = infoPickUp.houseNumber;
    formData.barangay = infoPickUp.barangay;
    formData.streetNumber = infoPickUp.streetNumber;
    formData.brand = truck_brand;
    formData.plateNumber = truck_plate;

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

        await sendUserLog("Rent", "Failed", `${truck_brand}`, `${truck_plate}`);
        navigate(-1);
        return;
      }

      setFormData({
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        notes: "",
      });
      showToast(
        "success",
        "SSK-TRUCKING",
        "Please wait for Admin Approval, Thank you.",
      );
      await sendUserLog("Rent", "Success", `${truck_brand}`, `${truck_plate}`);
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
  
  if(!accessToken) return <WarningPage />;

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
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/220x160/1e3050/ffffff?text=No+Image")
                  }
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

                {/* ── NEW: Pickup Info Fields ── */}
                <div className="field">
                  <label htmlFor="houseNumber">House Number</label>
                  <input
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    className="location-input"
                    placeholder="e.g. 123 or 12-A"
                    value={infoPickUp.houseNumber}
                    onChange={handleInfoPick}
                    pattern="[a-zA-Z0-9\s.,#/-]*"
                    title="Only letters, numbers, and basic punctuation allowed"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="barangay">Barangay</label>
                  <input
                    type="text"
                    id="barangay"
                    name="barangay"
                    className="location-input"
                    placeholder="e.g. Barangay San Jose"
                    value={infoPickUp.barangay}
                    onChange={handleInfoPick}
                    pattern="[a-zA-Z0-9\s.,#/-]*"
                    title="Only letters, numbers, and basic punctuation allowed"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="streetNumber">Street Number (Optional)</label>
                  <input
                    type="text"
                    id="streetNumber"
                    name="streetNumber"
                    className="location-input"
                    placeholder="e.g. Street 5 or Block 3"
                    value={infoPickUp.streetNumber}
                    onChange={handleInfoPick}
                    pattern="[a-zA-Z0-9\s.,#/-]*"
                    title="Only letters, numbers, and basic punctuation allowed"
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