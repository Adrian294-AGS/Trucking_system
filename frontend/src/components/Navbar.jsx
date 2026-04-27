import React from "react";
import { Link } from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("/");
  const links = [
    { id: "/", label: "Sign up" },
    { id: "/login", label: "Log in" },
    { id: "/admin", label: "Admin" },
  ];
  return (
    <nav className="navbar client-nav">
      <div className="nav-content">
        <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
          <div className="logo-icon">
            <img src={truckingLogo} alt="SSK Logo" className="nav-logo-img" />
          </div>
          <span className="user-title">Client Portal</span>
        </a>

        <div className="nav-links">
          {links.map((link) => (
              <Link to={link.id}>
                <div
                  key={link.id}
                  className={active === link.id ? "active" : ""}
                  onClick={(e) => { 
                    setActive(link.id);
                  }}
                >
                  <span>{link.label}</span>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
