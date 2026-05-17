import React, { useState, useEffect } from 'react';

export default function NotificationPanel({ 
  isOpen, 
  onClose, 
  notifications = [], 
  onMarkAllRead, 
  onNotificationClick 
}) {
  // State for which tab is active: 'requests' or 'system'
  const [activeTab, setActiveTab] = useState('requests');

  // Close panel when user presses Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Stop body from scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter notifications based on active tab
  let filteredNotifs = [];
  if (activeTab === 'requests') {
    // Show only request-type notifications
    filteredNotifs = notifications.filter(n => n.type === 'request');
  } else if (activeTab === 'system') {
    // Show only system-type notifications
    filteredNotifs = notifications.filter(n => n.type === 'system');
  }

  // Group notifications by date (Today, Yesterday, etc.)
  const groupedNotifs = {};
  for (let i = 0; i < filteredNotifs.length; i++) {
    const notif = filteredNotifs[i];
    // Convert timestamp to readable date like "Monday, May 12"
    const date = new Date(notif.timestamp).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Create array for this date if it doesn't exist
    if (!groupedNotifs[date]) {
      groupedNotifs[date] = [];
    }
    // Add notification to this date's array
    groupedNotifs[date].push(notif);
  }

  // If panel is closed, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Dark overlay behind the panel */}
      <div 
        className={`notif-overlay ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <aside 
        className={`notif-panel ${isOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-label="Notifications"
      >
        {/* Panel Header */}
        <div className="notif-panel-header">
          <h2 className="notif-panel-title">Notifications</h2>
          <div className="notif-header-actions">
            <button className="mark-all-btn" onClick={onMarkAllRead}>
              Mark all read
            </button>
            <button className="notif-close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        {/* Tab Buttons - Only Requests and System */}
        <div className="notif-filter-tabs">
          <button
            className={`notif-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
          <button
            className={`notif-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            System
          </button>
        </div>

        {/* Notification List */}
        <div className="notif-list">
          {/* Show message if no notifications */}
          {filteredNotifs.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">🔔</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            // Loop through each date group
            Object.keys(groupedNotifs).map((day) => (
              <div key={day}>
                {/* Date label like "Monday, May 12" */}
                <div className="notif-day-label">{day}</div>
                
                {/* Loop through notifications for this date */}
                {groupedNotifs[day].map((notif) => (
                  <div
                    key={notif.id}
                    className={`notif-item ${!notif.read ? 'unread' : ''}`}
                    onClick={() => onNotificationClick?.(notif)}
                  >
                    {/* Avatar circle */}
                    <div className={`notif-avatar av-${notif.avatarColor || 'gray'}`}>
                      {notif.avatarInitials || '🔔'}
                      {notif.badgeIcon && (
                        <span className={`notif-badge-icon badge-${notif.badgeColor || 'gray'}`}>
                          {notif.badgeIcon}
                        </span>
                      )}
                    </div>

                    {/* Notification text and details */}
                    <div className="notif-body">
                      <div className="notif-text" dangerouslySetInnerHTML={{ __html: notif.text }} />
                      <div className="notif-meta">
                        <span className="notif-time">{notif.time}</span>
                        {notif.tag && (
                          <span className={`notif-tag tag-${notif.tagType || 'system'}`}>
                            {notif.tag}
                          </span>
                        )}
                      </div>

                      {/* Action buttons like Approve/Decline */}
                      {notif.actions && (
                        <div className="notif-actions">
                          {notif.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className={`notif-action-btn ${action.className || ''}`}
                              onClick={(e) => {
                                e.stopPropagation(); // Don't trigger the item click
                                action.onClick?.(notif);
                              }}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Red dot for unread notifications */}
                    {!notif.read && <div className="unread-dot" />}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}