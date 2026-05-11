import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserAuth } from "../hooks/useUserAuth";
import LoadingPage from "../components/LoadingPage";
import { useToast } from "../context/ToastContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { logInAuth } = useUserAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const signInRes = await res.json();
      if (!signInRes.success) {
        showToast("error", "SignIn", signInRes.message);
        setFormData({ email: "", password: "" });
        return;
      }
      setIsLoading(true);
      logInAuth(signInRes.accessToken);
    } catch (err) {
      console.log("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  const handleLoadingComplete = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <LoadingPage
        onComplete={handleLoadingComplete}
        brand="SSK TRUCKING"
        tagline="Client Portal · Loading please wait..."
        tips={[
          "Revving up the engines...",
          "Checking vehicle availability...",
          "Syncing your account data...",
          "Almost there! Hang tight...",
        ]}
        duration={3000}
      />
    );
  }

  return (
    <div>
      <Navbar />
      <main className="page">
        <div className="form-section">
          <div className="form-layout">
            <h1>Log in</h1>
            <p className="form-subtitle">Fill in the form below to log in.</p>

            {error && <div className="form-error">{error}</div>}

            <form id="login-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="btn-row">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            <p className="switch-link">
              No account yet? <Link to="/">Register here</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
