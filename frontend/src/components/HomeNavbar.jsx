import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import truckingLogo from "@/assets/ssk_trucking_white.png";
import ProfilePanel from "./ProfilePanel";
import NotificationBell from "./NotificationBell";
import { useUserAuth } from "../hooks/useUserAuth";

export default function HomeNavbar({ user }) {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
    
      text: "Your rental request for <strong>Isuzu Wing Van</strong> has been approved.",
      // time: "2h ago",
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      read: false,
      type: "request",
      tag: "Approved",
      tagType: "approved",
      // avatarInitials: "",
      avatarColor: "green",
      // badgeIcon: "✓",
      badgeColor: "green",
       },
    {
      
      text: "New payment received for order #1234",
      time: "5h ago",
      timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
      read: false,
      type: "system",
      tag: "Payment",
      tagType: "payment",
      avatarInitials: "💳",
      avatarColor: "navy",
      actions: [],
    },
    {
      
      text: "Reminder: Your rental returns tomorrow at 5:00 PM",
      time: "1d ago",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: "system",
      tag: "Reminder",
      tagType: "reminder",
      avatarInitials: "⏰",
      avatarColor: "yellow",
      actions: [],
    },
  ]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/trucks")) setActive("trucks");
    else if (path.includes("/contact")) setActive("contact");
    else if (path.includes("/home")) setActive("home");
    else setActive("home");
  }, [location]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navItems = [
    { id: "trucks", label: "Trucks", path: "/trucks" },
    { id: "home", label: "Home", path: "/home" },
    { id: "contact", label: "Contact us", path: "/contact" },
  ];

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
    );
  };

  useEffect(() => {
    if(!user) return;
    const fetNotif = async () => {
      try {
        const res = await fetch("/api/use/getNotif", {
          method: "GET",
          headers: {
            Authorization: `Bearer`
          }
        })
      } catch (error) {
        console.log("FetchNotif ERROR: ", error);
      }
    }
  })

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src={truckingLogo} alt="SSK Logo" className="nav-logo-img" />
          </div>
          <span className="user-title">SSK-TRUCKING</span>
        </Link>
    

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
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

          {/* Notification Bell */}
          <NotificationBell
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onNotificationClick={handleNotificationClick}
          />

          {/* Profile Avatar */}
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
                {user?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AA"}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Profile Panel */}
      <ProfilePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        user={user}
      />
    </>
  );
}