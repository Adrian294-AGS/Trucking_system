import React from 'react'
import HomeNavbar from '../components/HomeNavbar';
import { useUserAuth } from '../hooks/useUserAuth';

export default function Orders() {
  const {user, accessToken} = useUserAuth();
 const order = {
    truck: {
      name: 'Isuzu-Wing Truck',
      plate: '00-000',
      image: '../images/truck1.jpg'
    },
    pickupDate: '2026-04-28',
    returnDate: '2026-05-05',
    location: 'Manila Port Area, Philippines',
    notes: 'Please bring extra straps and tarpaulin.'
  };

  return (
    accessToken ? (
      <div>
        <HomeNavbar user={user}/>
        <main className="page">
      <div className="page-content">
        <h1 className="page-title">Your order</h1>

        <div className="order-layout">
          {/* Truck Preview */}
          <div className="truck-slot">
            <div className="truck-img">
              <img src={order.truck.image} alt={order.truck.name} />
            </div>
            <div className="truck-info">
              <div className="truck-name">{order.truck.name}</div>
              <div className="truck-plate">Plate: {order.truck.plate}</div>
            </div>
            <div className="truck-status available">Available</div>
          </div>

          {/* Order Details (Read-Only) */}
          <div className="order-form-box">
            <div className="form-title">Rent Details</div>

            <label>Pickup Date</label>
            <div className="input-row">
              <input type="date" className="form-input" value={order.pickupDate} readOnly />
              <span className="cal-icon">📅</span>
            </div>

            <label>Return Date</label>
            <div className="input-row">
              <input type="date" className="form-input" value={order.returnDate} readOnly />
              <span className="cal-icon">📅</span>
            </div>

            <label>Pickup Location</label>
            <input 
              type="text" 
              className="form-input location-input" 
              placeholder="Enter Address" 
              value={order.location} 
              readOnly 
            />

            <label>Notes</label>
            <textarea className="form-textarea" value={order.notes} readOnly />
          </div>
        </div>
      </div>
    </main>
    </div>
    ) : (
      <div>NO CONTENT</div>
    )
  );
}
