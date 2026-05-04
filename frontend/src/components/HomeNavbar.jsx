import React, { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import ProfilePanel from "./ProfilePanel";
import { useUserAuth } from "../hooks/useUserAuth";

export default function HomeNavbar({ user }) {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Auto-set active nav item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/trucks")) setActive("trucks");
    else if (path.includes("/contact")) setActive("contact");
    else setActive("home");
  }, [location]);

  const navItems = [
    { id: "trucks", label: "Trucks", path: "/trucks" },
    { id: "home", label: "Home", path: "/home" },
    { id: "contact", label: "Contact us", path: "/contact" },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src={truckingLogo} alt="SSK Logo" className="nav-logo-img" />
          </div>
          <span className="user-title">SSK-TRUCKING</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={active === item.id ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}

          <Link to="/orders">
            <button className="nav-cart" aria-label="View cart">cart</button>
          </Link>

          {/* Avatar Button - Opens Profile Panel */}
          <button
            className="nav-avatar-btn"
            onClick={() => setIsPanelOpen(true)}
            aria-label="Open profile"
            title="My Profile"
          >
            {user?.photo ? (
              <img src={user.photo} alt="Profile" className="nav-avatar-img" />
            ) : (
              <span className="nav-avatar-initials">
                {user?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AA'}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Profile Slide-out Panel */}
      <ProfilePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        user={user}
      />
    </>
  );
}