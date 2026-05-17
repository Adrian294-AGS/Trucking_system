import React, { useState } from 'react';
import NotificationPanel from './NotificationPanel';

export default function NotificationBell({ 
  notifications = [], 
  onMarkAllRead, 
  onNotificationClick 
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <button 
        className="nav-bell-btn" 
        onClick={() => setIsPanelOpen(true)}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        title="Notifications"
      >
        <span className="notif-bell-icon" aria-hidden="true">🔔</span>
        {unreadCount > 0 && (
          <span className="nav-bell-badge" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount}
          </span>
        )}
      </button>

      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
        onNotificationClick={onNotificationClick}
      />
    </>
  );
}