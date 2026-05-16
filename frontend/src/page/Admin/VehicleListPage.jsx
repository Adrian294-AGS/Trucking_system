import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  return (
    <>
      <div className="page-header">
        <h1 className="page-title" style={{color: "yellow"}}><span></span>Vehicle List</h1>
        <div to="/admin/add-truck" className="btn-add">+ Add Vehicle</div>
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
            {vehicles.map((truck) => (
              <tr key={truck.truck_id}>
                <td>{truck.truck_id}</td>
                <td>{truck.model}</td>
                <td>{truck.plate_number}</td>
                <td>{truck.truck_type}</td>
                <td>
                  <span className={`status ${truck.status}`}>
                    {truck.status}
                  </span>
                </td>
                <td>
                    <button className="edit-button" onClick={() => navigate("/admin/editVehicle", {state: {truck_id: truck.truck_id, model: truck.model, year: truck.year, plate_number: truck.plate_number, truck_type: truck.truck_type, fuel_type: truck.fuel_type, photo: truck.photo_url, status: truck.status}})}>
                        Edit
                    </button>              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}