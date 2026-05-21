import React, { useEffect } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useNotif } from "../context/NotificationContext";
import { useNotifBell } from "../context/NotificationInfoContext";

export default function ProfilePanel({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const { setNotifications } = useNotifBell();
  const { sendUserLog } = useNotif();
  const { logout, setAccessToken } = useUserAuth();
  // Close panel on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AA";

  const handleLogout = () => {
    logout();
    sendUserLog("Log out", "Success");
    setNotifications(null);
    navigate("/login");
    // Clear auth tokens, redirect to login, etc.
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`profile-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <aside
        className={`profile-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="User Profile"
      >
        <button
          className="panel-close"
          onClick={onClose}
          aria-label="Close panel"
        >
          ✕
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.photo ? (
              <img src={user.photo} alt="Profile" className="avatar-img" />
            ) : (
              <div className="avatar-initials">{initials}</div>
            )}
          </div>
          <div className="panel-name-block">
            <div className="profile-fullname">
              {user?.fullName || "Guest User"}
            </div>
            <div className="role">{user?.role || "Customer"}</div>
          </div>
        </div>

        <div className="panel-divider" />

        <div className="panel-section-label">Profile Information</div>

        <div className="panel-info-list">
          <div className="panel-info-item">
            <span className="info-icon">✉️</span>
            <div>
              <div className="info-label">Email</div>
              <div className="info-value">{user?.email || "—"}</div>
            </div>
          </div>

          <div className="panel-info-item">
            <span className="info-icon">📱</span>
            <div>
              <div className="info-label">Phone</div>
              <div className="info-value">{user?.phone || "—"}</div>
            </div>
          </div>
        </div>

        <div className="panel-actions">
          <button className="btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
