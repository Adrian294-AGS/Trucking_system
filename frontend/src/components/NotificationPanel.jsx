import React, { useState, useEffect } from 'react';
import { useNotifBell } from '../context/NotificationInfoContext';

// ─── Tag color map: tagType → colors ─────────────────────────────────────────
const TAG_COLORS = {
  complete: { bg: '#dcfce7', color: '#166534' },
  approved: { bg: '#dbeafe', color: '#1e40af' },
  pending:  { bg: '#fef9c3', color: '#854d0e' },
  system:   { bg: '#f1f5f9', color: '#475569' },
};

// ─── Format timestamp → "May 18, 2026" ───────────────────────────────────────
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// ─── Format timestamp → "11:42 AM" ───────────────────────────────────────────
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  });
}

// ─── Group a list of notifications by date string ────────────────────────────
function groupByDate(list) {
  if(!list) return;
  const groups = {};
  for (const notif of list) {
    const label = formatDate(notif.timeStamp);
    if (!groups[label]) groups[label] = [];
    groups[label].push(notif);
  }
  return groups;
}

// ─── Single notification row ──────────────────────────────────────────────────
function NotifItem({ notif, onMarkRead }) {
  const tagStyle  = TAG_COLORS[notif.tagType] || TAG_COLORS.system;
  const isUnread  = notif.isRead === 0;
  const displayText = notif.text || `New ${notif.tag} notification`;

  return (
    <div
      onClick={() => isUnread && onMarkRead(notif.notif_id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 16px',
        cursor: isUnread ? 'pointer' : 'default',
        background: isUnread ? '#f0fdf4' : 'transparent',
        borderBottom: '1px solid #f1f5f9',
        transition: 'background 0.2s',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: '#bbf7d0', color: '#166534',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: 12,
      }}>
        🔔
      </div>

      {/* Message + time + tag */}
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 4px', fontSize: 14, color: '#1e293b', lineHeight: 1.4 }}>
          {displayText}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{formatTime(notif.timeStamp)}</span>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 7px',
            borderRadius: 999, background: tagStyle.bg, color: tagStyle.color,
          }}>
            {notif.tag}
          </span>
        </div>
      </div>

      {/* Green dot — shown when isRead = 0 */}
      {isUnread && (
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#22c55e', flexShrink: 0, marginTop: 6,
        }} />
      )}
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
// Props from NotificationBell:
//   isOpen        — whether the panel is visible
//   onClose       — called when user closes the panel
//   notifications — the full notifications array (state lives in NotificationBell)
//   onMarkRead    — call with a notif_id to mark one as read
//   onMarkAllRead — call to mark all as read
export default function NotificationPanel({
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
}) {
  const [activeTab, setActiveTab] = useState('requests');
  const { notifications } = useNotifBell();

  // Close panel on Escape key
  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape' && isOpen) onClose(); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Filter by tab: Requests tab = type 'request', System tab = type 'system'
  const filtered = notifications?.filter(n =>
    activeTab === 'requests' ? n.type === 'request' : n.type === 'system'
  );

  // Count unread in the current tab
  const unreadCount = filtered?.filter(n => n.isRead === 0).length;

  // Group filtered notifications by date
  const grouped = groupByDate(filtered);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay — clicking it closes the panel */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.25)', zIndex: 100,
        }}
      />

      {/* Slide-in panel */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 380, background: '#fff', zIndex: 101,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        fontFamily: 'system-ui, sans-serif',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span style={{
                background: '#22c55e', color: '#fff',
                fontSize: 11, fontWeight: 700,
                borderRadius: 999, padding: '2px 7px',
              }}>
                {unreadCount}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={onMarkAllRead}
              style={{
                fontSize: 12, color: '#3b82f6',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              }}
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 20, color: '#94a3b8', lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 20px' }}>
          {['requests'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 16px', fontSize: 14, fontWeight: 500,
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? '#22c55e' : '#94a3b8',
                borderBottom: activeTab === tab ? '2px solid #22c55e' : '2px solid transparent',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: '#94a3b8' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
              <p style={{ margin: 0, fontSize: 13 }}>No notifications</p>
            </div>
          ) : (
            Object.entries(grouped).map(([dateLabel, items]) => (
              <div key={dateLabel}>
                <div style={{
                  padding: '7px 16px', fontSize: 11, fontWeight: 600,
                  color: '#94a3b8', background: '#f8fafc',
                  borderBottom: '1px solid #f1f5f9',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {dateLabel}
                </div>
                {items.map(notif => (
                  <NotifItem key={notif.notif_id} notif={notif} onMarkRead={onMarkRead} />
                ))}
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}