import React from "react";
import { Link } from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState();
  const navItems = [
    { id: "/", label: "Sign up", path: "/" },
    { id: "login", label: "Log in", path: "/login" },
    { id: "admin", label: "Admin", path: "/admin" },
  ];
  useEffect(() => {
    if (window.location.pathname === "/") {
      setActive("/");
    } else if (window.location.pathname === "/login") {
      setActive("login");
    } else if (window.location.pathname === "/admin") {
      setActive("admin");
    } 
  }, []);

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
        </div>
      </div>
    </nav>
  );
}
