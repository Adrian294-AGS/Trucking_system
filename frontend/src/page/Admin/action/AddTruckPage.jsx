import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useToast } from '../../../context/ToastContext';

export default function AddTruckPage() {
  const navigate = useNavigate();
  const { accessToken } = useUserAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    brand: '',
    plateNumber: '',
    truckType: 'Wing Van',
    status: 'available',
    year: '',
    fuelType: 'Diesel',
    photo: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      const res = await fetch('/api/truck/addVehicle', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: submitData,
        credentials: 'include'
      });

      const result = await res.json();
      
      if (!result.success) {
        showToast('error', 'SSK-TRUCKING', result.message);
        return;
      }
      
      showToast('success', 'SSK-TRUCKING', 'Truck added successfully!');
      navigate('/admin/vehicles');
    } catch (error) {
      console.error('AddTruck ERROR:', error);
      showToast('error', 'SSK-TRUCKING', 'Failed to add truck. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/vehicles');
  };

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title"><span></span>Add New Truck</h1>
      </div>

      <form className="add-panel" onSubmit={handleSubmit}>
        {/* Left: Image Upload */}
        <div className="image-upload-box">
          {previewUrl ? (
            <img src={previewUrl} alt="Truck preview" className="preview-img" />
          ) : (
            <>
              <span>Upload Image</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                aria-label="Upload truck image"
              />
            </>
          )}
        </div>

        {/* Right: Form Fields */}
        <div className="truck-form">
          <h2 className="form-section-title">Truck Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="brand">Brand Name</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Isuzu"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="plateNumber">Plate Number</label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="e.g. CAO 6621"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="truckType">Truck Type</label>
              <select
                id="truckType"
                name="truckType"
                value={formData.truckType}
                onChange={handleChange}
                required
              >
                <option value="Wing Van">Wing Van</option>
                <option value="Side drop elf">Side drop elf</option>
                <option value="Closed Van">Closed Van</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Tanker">Tanker</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year / Model</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 2021"
                required
              />
            </div>

            <div className="form-group">
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

            <div className="form-group full-width">
              <label>Status</label>
              <div className="status-options">
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="available"
                    checked={formData.status === 'available'}
                    onChange={handleChange}
                  />
                  <span>Available</span>
                </label>
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="maintenance"
                    checked={formData.status === 'maintenance'}
                    onChange={handleChange}
                  />
                  <span>Under Maintenance</span>
                </label>
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="unavailable"
                    checked={formData.status === 'unavailable'}
                    onChange={handleChange}
                  />
                  <span>Unavailable</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="btn-row">
              <button type="submit" className="btn-save" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}