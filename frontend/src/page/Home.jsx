import React from 'react'
import truckImg from '@/assets/truck-highway-sunny-sky.jpg';
import HomeNavbar from '../components/HomeNavbar';

export default function Home() {
 const maintenanceTrucks = Array(4).fill({ id: 'm', brand: 'Hino', img: '../images/truck1.jpg' });
  const unavailableTrucks = Array(4).fill({ id: 'u', brand: 'Isuzu', img: '../images/truck1.jpg' });
  const availableTrucks = Array(8).fill({ id: 'a', brand: 'Mitsubishi', img: '../images/truck1.jpg' });

  const TruckCard = ({ status, truck, isLink = true }) => {
    const content = (
      <div className={`truck-slot ${status}`}>
        <div className="slot-header">{status === 'maintenance' ? 'Under maintenance' : status.charAt(0).toUpperCase() + status.slice(1)}</div>
        <div className="truck-img"><img src={truckImg || '#'} alt={`Truck ${truck.brand}`} /></div>
        <div className="slot-footer">Brand: {truck.brand}</div>
      </div>
    );
    return isLink ? (
      <a href="#" className="truck-link" onClick={(e) => e.preventDefault()}>
        {content}
      </a>
    ) : content;
  };

  return (
   <div>
    <HomeNavbar />
     <main className="page">
      {/* BANNER */}
      <div className="banner">
        <div className="banner-content">
          <h1>Truck rentals for every need.</h1>
          <button className="btn-rent" onClick={() => window.location.href = '/trucks'}>Rent now!</button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">Total Vehicle</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">In Maintenance</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">Unavailable</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="status-row">
          {/* Maintenance */}
          <div className="status-col">
            <span className="status-badge badge-yellow">Under Maintenance</span>
            <div className="truck-grid truck-grid-2col">
              {maintenanceTrucks.map((t, i) => (
                <TruckCard key={i} status="maintenance" truck={t} isLink={false} />
              ))}
            </div>
          </div>

          {/* Unavailable */}
          <div className="status-col">
            <span className="status-badge badge-red">Unavailable</span>
            <div className="truck-grid truck-grid-2col">
              {unavailableTrucks.map((t, i) => (
                <TruckCard key={i} status="unavailable" truck={t} isLink={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Available */}
        <h2 className="section-title">Available Trucks</h2>
        <div className="truck-grid">
          {availableTrucks.map((t, i) => (
            <TruckCard key={i} status="available" truck={t} />
          ))}
        </div>
      </div>
    </main>
   </div>
  );
}
