import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotif } from '../../context/NotificationContext';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useToast } from '../../context/ToastContext';
import WarningPage from '../../components/WarningPage';

export default function VehicleListPage() {
  const { update } = useNotif();
  const navigate = useNavigate();
  const { accessToken } = useUserAuth();
  const [vehicles, setVehicles] = useState([]);
  const { showToast } = useToast();
  
  // Filter state
  const [filterStatus, setFilterStatus] = useState('all');

  if(!accessToken) return <WarningPage />;

  useEffect(() => {
    const fetchAllTruck = async () => {
        try {
            const res = await fetch("/api/admin/fetchAllTruck", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                credentials: "include"
            });
            const result = await res.json();
            if(!result.success){
                showToast("error", "Vehicle Page", result.message);
                return;
            };
            setVehicles(result.trucks);
        } catch (error) {
            console.log("fetchAllTruck FRONT ERROR: ", error);
        }
    }
    fetchAllTruck();
  }, [update])

  // ── FIXED: Filter vehicles based on selected status ──
  const filteredVehicles = vehicles.filter(truck => {
    if (filterStatus === 'all') return true;
    
    // If filtering by 'reserved', check on_trip === 1
    if (filterStatus === 'reserved') {
      return truck.on_trip === 1;
    }
    
    // ── FIXED: For 'available', exclude reserved trucks (on_trip === 1) ──
    if (filterStatus === 'available') {
      return truck.status === 'available' && truck.on_trip !== 1;
    }
    
    // For other statuses (maintenance, unavailable), match the status field
    return truck.status === filterStatus;
  });

  return (
    <>
      <div className="page-header">
        <h1 className="page-title" style={{color: "yellow"}}><span></span>Vehicle List</h1>
        <Link to={"/admin/addVehicle"} className="btn-add">+ Add Vehicle</Link>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button 
          className={`filter-tab ${filterStatus === 'available' ? 'active' : ''}`}
          onClick={() => setFilterStatus('available')}
        >
          Available
        </button>
        <button 
          className={`filter-tab ${filterStatus === 'reserved' ? 'active' : ''}`}
          onClick={() => setFilterStatus('reserved')}
        >
          Reserved
        </button>
        <button 
          className={`filter-tab ${filterStatus === 'maintenance' ? 'active' : ''}`}
          onClick={() => setFilterStatus('maintenance')}
        >
          Maintenance
        </button>
        <button 
          className={`filter-tab ${filterStatus === 'unavailable' ? 'active' : ''}`}
          onClick={() => setFilterStatus('unavailable')}
        >
          Unavailable
        </button>
      </div>

      <div className="info-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Plate No.</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No vehicles found for "{filterStatus}" status.
                </td>
              </tr>
            ) : (
              filteredVehicles.map((truck) => (
                <tr key={truck.truck_id}>
                  <td>{truck.truck_id}</td>
                  <td>{truck.model}</td>
                  <td>{truck.plate_number}</td>
                  <td>{truck.truck_type}</td>
                  <td>
                    {/* Show "Reserved" when on_trip === 1 */}
                    <span className={`status ${truck.on_trip === 1 ? 'reserved' : truck.status}`}>
                      {truck.on_trip === 1 ? 'Reserved' : truck.status}
                    </span>
                  </td>
                  <td>
                     {/* Only show Edit button if truck is NOT on trip (on_trip === 0) */}
                     {truck.on_trip === 0 ? (
                       <button 
                        className="edit-button" 
                        onClick={() => navigate("/admin/editVehicle", {
                          state: {
                            truck_id: truck.truck_id, 
                            model: truck.model, 
                            year: truck.year, 
                            plate_number: truck.plate_number, 
                            truck_type: truck.truck_type, 
                            fuel_type: truck.fuel_type, 
                            photo: truck.photo_url, 
                            status: truck.on_trip === 1 ? 'reserved' : truck.status,
                            on_trip: truck.on_trip
                          }
                        })}
                      >
                          Edit
                      </button>     
                     ) : (
                       <button 
                        className="edit-button" 
                        disabled
                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                      >
                          Not Available
                      </button>     
                     )}         
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}