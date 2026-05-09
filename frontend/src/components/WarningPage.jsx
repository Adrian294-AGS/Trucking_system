import React from 'react';

export default function WarningPage({ 
  onSignIn, 
  message = "You need to sign in to access this page.",
  subMessage = "Please log in to your SSK Trucking account to continue."
}) {

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="warning-overlay">
      {/* Stars Background (Reusing loading screen styles) */}
      <div className="stars">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Warning Box */}
      <div className="warning-box">
        
        {/* Lock Icon with Pulse */}
        <div className="lock-ring">
          <div className="lock-icon">🔒</div>
        </div>

        {/* Header Text */}
        <div className="warning-header">
          <h1 className="warn-title">Access Restricted</h1>
          <p className="warn-subtitle">
            {message} <br />
            <span>{subMessage}</span>
          </p>
        </div>

        {/* Info Card */}
        <div className="warn-card">
          <div className="warn-label">⚠ Why am I seeing this?</div>
          <div className="warn-msg">
            This page requires an active session. You may have been <strong>logged out</strong>, 
            or you tried to access a protected page without signing in.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="warn-actions">
          <button className="btn-warn-secondary" onClick={handleGoBack}>
            ← Go Back
          </button>
        </div>

        {/* Brand Footer */}
        <div className="warn-brand">
          SSK TRUCKING · <span>© 2026</span> All Rights Reserved
        </div>
      </div>
    </div>
  );
}