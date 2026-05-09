import React, { useState, useEffect, useRef } from "react";
import { useUserAuth } from "../hooks/useUserAuth";

export default function LoadingPage({
  onComplete,
  brand = "SSK TRUCKING",
  tagline = "Client Portal · Loading please wait...",
  tips = [
    "Revving up the engines...",
    "Checking vehicle availability...",
    "Syncing your account data...",
    "Almost there! Hang tight...",
  ],
  duration = 3000, // ms
}) {
  const { setRefreshLoad } = useUserAuth();
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const starsRef = useRef([]);

  // Generate random stars on mount
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      });
    }
    starsRef.current = stars;
  }, []);

  // Progress animation
  useEffect(() => {
    if (isDone) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      // Rotate tips every 25% progress
      if (pct % 25 === 0 && pct > 0) {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }

      if (pct < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 400);
      }
    };
    requestAnimationFrame(animate);
  }, [duration, tips, onComplete, isDone]);

  if (isDone) {
    return (
      <div className="loading-overlay show">
        <div className="checkmark">✓</div>
        <h2>You're Good to Go!</h2>
        <p>Your client portal is ready. Let's move</p>
        <button className="btn-enter" onClick={onComplete}>
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="loading-wrapper">
      {/* Animated Stars Background */}
      <div className="stars">
        {starsRef.current.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--delay": `${star.delay}s`,
              "--d": `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="scene">
        {/* Spinning Logo Ring */}
        <div className="logo-ring">
          <div className="logo-box">
            SSK
            <br />
            TRK
          </div>
        </div>

        {/* Brand Text */}
        <div className="brand-text">
          <h1>{brand}</h1>
          <p>{tagline}</p>
        </div>

        {/* Rotating Tagline */}
        <div className="tagline">
          <span>{tips[currentTip]}</span>
        </div>

        {/* Progress Bar */}
        <div className="progress-wrap">
          <div className="progress-track">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-label">
            <span>Initializing...</span>
            <span className="pct">{progress}%</span>
          </div>
        </div>

        {/* Tip Box */}
        <div className="tip-box">
          <div className="tip-label">Did you know?</div>
          <div className="tip-text">
            SSK Trucking offers 24/7 roadside assistance for all rented
            vehicles.
          </div>
        </div>
      </div>
    </div>
  );
}
