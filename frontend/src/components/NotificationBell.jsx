import React, { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNotif } from "../context/NotificationContext";
import { useToast } from "../context/ToastContext";

// ─── NotificationBell ─────────────────────────────────────────────────────────
// Props from HomeNavbar:
//   notifications         — array from useNotifBell() context
//   onMarkAllRead         — marks all as read in context
//   onNotificationClick   — marks one as read in context (by notif object)
export default function NotificationBell({
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { accessToken } = useUserAuth();
  const { sendUpdate } = useNotif();
  const { showToast } = useToast();
  // Count unread — isRead comes from DB as 0 (unread) or 1 (read)
  const unreadCount = notifications?.filter((n) => n.isRead === 0).length;

  // Wrap onNotificationClick so NotificationPanel can call it with just the notif_id
  async function handleMarkRead(notif_id) {
    try {
      const notif = notifications?.find((n) => n.notif_id === notif_id);
      if (notif) onNotificationClick?.(notif);
      const res = await fetch(`/api/user/markNotif/${notif.notif_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
      const result = await res.json();
      if(!result.success){
        showToast("error", "SSK-TRUCKING", "Failed To Mark");
        return;
      }
    } catch (error) {
      console.log("handleMark ERROR: ", error);
    }
  }

  return (
    <>
      {/* Bell button */}
      <button
        onClick={() => setIsPanelOpen(true)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <span style={{ fontSize: 22 }} aria-hidden="true">
          🔔
        </span>

        {/* Red badge — only shown when there are unread notifications */}
        {unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} unread notifications`}
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              background: "#ef4444",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 999,
              minWidth: 16,
              height: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel — passes context data down */}
      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onMarkAllRead={onMarkAllRead}
      />
    </>
  );
}
