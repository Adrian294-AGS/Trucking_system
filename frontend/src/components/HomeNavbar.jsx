import React from "react";
import { Link } from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import { useState, useEffect } from "react";

export default function HomeNavbar({username, photo}) {
  const [active, setActive] = useState();
  const navItems = [
    { id: "trucks", label: "Trucks", path: "/trucks" },
    { id: "home", label: "Home", path: "/home" },
    { id: "contact", label: "Contact us", path: "/contact" },
  ];

  useEffect(() => {
    if(window.location.pathname === "/home") {
      setActive("home");
    } else if(window.location.pathname === "/trucks") {
      setActive("trucks");
    } else if(window.location.pathname === "/contact") {
      setActive("contact");
    };
  }, []);

  return (
    <div>
      <nav className="navbar">
        <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
          <div className="logo-icon">
            <img src={truckingLogo} alt="SSK Logo" className="nav-logo-img" />
          </div>
          <span className="user-title">SSK-TRUCKING</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={active === item.id ? "active" : ""}
              onClick={(e) => {
                setActive(item.id);
              }}
            >
              {item.label}
            </Link>
          ))}

          <Link to="/cart">
            <button className="nav-cart">cart</button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
