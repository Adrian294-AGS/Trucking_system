import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "@/assets/style/EditTruck.module.css";
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useToast } from '../../../context/ToastContext';
import { useNotif } from '../../../context/NotificationContext';

export default function EditTruckPage() {
  const location = useLocation();
  const { accessToken } = useUserAuth();
  const { sendUpdate } = useNotif();
  const navigate = useNavigate();
  const { state } = location;
  const { showToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    truck_id: state.truck_id,
    brand: state.model,
    plateNumber: state.plate_number,
    model: state.model,
    year: state.year,
    type: state.truck_type,
    fuelType: state.fuel_type,
    status: state.status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/truck/editVehicle", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const result = await res.json();
      if(!result.success){
        showToast("error", "SSK-TRUCKING", result.message);
        return;
      };
      sendUpdate();
      showToast("success", "SSK-TRUCKING", result.message);
      navigate("/admin/vehicles");
    } catch (error) {
      console.log("EditTruck ERROR: ", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this truck?')) {
      try {
        const res = await fetch(`/api/truck/deleteTruck/${formData.truck_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          credentials: "include"
        });
        const result = await res.json();
        if(!result.success){
          showToast("error", "SSK-TRUCKING", result.message);
          return;
        };
        showToast("success", "SSK-TRUCKING", result.message);
        sendUpdate();
        navigate("/admin/vehicles");
      } catch (error) {
        console.log("Edit Truck delete ERROR: ", error);
      }
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title" style={{color: "yellow"}}><span></span>Edit Truck</h1>
      </div>

      <div className={styles.editPanel}>
        {/* Left: Truck Preview */}
        <div className={styles.truckPreview}>
          <div className={styles.statusBar}>
            {formData.status.toUpperCase()}
          </div>
          <img 
            src={`${import.meta.env.VITE_API_URL}/${state.photo}`} 
            alt={formData.model}
          />
        </div>

        {/* Right: Form */}
        <form className={styles.truckForm} onSubmit={handleSave}>
          <h2 className={styles.formSectionTitle}>Truck Information</h2>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="brand">Brand Name</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="plateNumber">Plate Number</label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="model">Truck Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Truck Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Wing Van">Wing Van</option>
                <option value="Dump Truck">Dump Truck</option>
                <option value="Side Drop Elf">Side Drop Elf</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Flatbed">Flatbed</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="fuelType">Fuel Type</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

             <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="available">Available</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Buttons */}
            <div className={styles.btnRow}>
              <button type="submit" className={styles.btnSave}>
                Save Changes
              </button>
              <button type="button" className={styles.btnDelete} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}