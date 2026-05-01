import React from "react";
import { useState } from "react";
import "@/assets/style/rentPage.css";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";

export default function RentPage() {
  const navigate = useNavigate();
  const {accessToken} = useUserAuth();
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
    const { pickup_date, return_date } = formData;
    if (!pickup_date || !return_date) return false;
    const pickup = new Date(pickup_date);
    const returns = new Date(return_date);
    return returns >= pickup;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateDates()) {
      setError("Return date must be on or after pickup date.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Rent submission:", formData);
      // 🔹 Replace with your actual API call
      // const res = await fetch('/api/rentals/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!res.ok) throw new Error('Failed to create rental');

      setSuccess(
        "🎉 Truck reserved successfully! Check your email for confirmation.",
      );
      navigate("/success", {state: {clientName: 'Alexandrie Abon',
    truck: { brand: 'Isuzu', plate: '000-11-ABC', year: '2021', type: 'Wing van', fuel: 'Diesel' }}});
 
      setFormData({
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message || "Failed to process rental. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   accessToken ? (
    <div>
     <HomeNavbar />
    <main className="page">
      <div className="main-content">
        <h1 className="page-title">Rent a truck</h1>

        <div className="rent-layout">
          {/* TRUCK PREVIEW */}
          <div className="truck-preview">
            <div className="truck-preview-img">
              <img src="../src/assets/truck-highway-sunny-sky.jpg" alt="Isuzu Wing Truck" />
            </div>
            <div className="truck-preview-info">
              <div className="truck-name">Isuzu-Wing truck</div>
              <div className="truck-plate">Plate: 00-000</div>
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
   ):(
    <div>
      NO CONTENT YET
    </div>
   )
  );
}
