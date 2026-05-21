import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import ProfilePanel from "./ProfilePanel";
import NotificationBell from "./NotificationBell";
import { useNotifBell } from "../context/NotificationInfoContext";
import { useUserAuth } from "../hooks/useUserAuth";
import { useToast } from "../context/ToastContext";

export default function HomeNavbar({ user }) {
  const location = useLocation();
  const { accessToken } = useUserAuth();
  const { showToast } = useToast();
  const { notifications, setNotifications } = useNotifBell();
  const [active, setActive]       = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/trucks"))    setActive("trucks");
    else if(path.includes("/home"))  setActive("home");
    else setActive("");
  }, [location]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navItems = [
    { id: "trucks",  label: "Trucks",     path: "/trucks" },
    { id: "home",    label: "Home",       path: "/home" },
  ];

  // Mark ALL notifications as read — uses isRead field to match DB column
  async function handleMarkAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: 1 })));
    try {
      const res = await fetch("/api/user/markAllNotif", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });

      const result = await res.json();
      if(!result.success){
        showToast("error", 'SSK-TRUCKING', "Mark All As Read Is failed");
        return;
      }
    } catch (error) {
      console.log("handleAllMArke ERROR: ", error);
    }
  }

  // Mark ONE notification as read — matches by notif_id (DB primary key)
  function handleNotificationClick(notif) {
    setNotifications(prev =>
      prev.map(n => n.notif_id === notif.notif_id ? { ...n, isRead: 1 } : n)
    );
  }

  return (
    <>
      <nav className="navbar">
        <Link to="" className="logo">
          <div className="logo-icon">
            <img src={truckingLogo} alt="SSK Logo" className="nav-logo-img" />
          </div>
          <span className="user-title">SSK-TRUCKING</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={active === item.id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            <button className="nav-cart" aria-label="View cart">cart</button>
          </Link>

          {/* Notification Bell — receives context data and updater functions */}
          <NotificationBell
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onNotificationClick={handleNotificationClick}
          />

          <button
            className="nav-avatar-btn"
            onClick={() => { setIsPanelOpen(true); setMenuOpen(false); }}
            aria-label="Open profile"
            title="My Profile"
          >
            {user?.photo ? (
              <img src={user.photo} alt="Profile" className="nav-avatar-img" />
            ) : (
              <span className="nav-avatar-initials">
                {user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "AA"}
              </span>
            )}
          </button>
        </div>
      </nav>

      <ProfilePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        user={user}
      />
    </>
  );
}