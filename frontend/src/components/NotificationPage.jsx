import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import truckingLogo from "@/assets/ssk_trucking_white.png";

export default function NotificationPage() {
  const location = useLocation();
  const data = location.state;
 
  return (
    <div>
      <HomeNavbar />
      <main className="page">
        <div className="page-content">
          <div className="success-card">
            <div className="success-header">
              <div className="success-title">Rent successfully </div>
              <div className="logo-area">
                <img src={truckingLogo} alt="SSK Logo" />
              </div>
              <div className="client-name">
                {data.clientName} <span>(Client)</span>
              </div>
              <div className="thank-you">
                Thank you for trusting SSK TRUCKING
              </div>
            </div>

            <div className="you-rent">You Rent:</div>

            <table className="rent-table">
              <tbody>
                <tr>
                  <td>{data.truck.brand}</td>
                </tr>
                <tr>
                  <td>{data.truck.plate}</td>
                </tr>
                <tr>
                  <td>{data.truck.year}</td>
                </tr>
                <tr>
                  <td>{data.truck.type}</td>
                </tr>
                <tr>
                  <td>{data.truck.fuel}</td>
                </tr>
              </tbody>
            </table>

            <Link to="/trucks">
              <button className="btn-another">Make Another Transaction</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
