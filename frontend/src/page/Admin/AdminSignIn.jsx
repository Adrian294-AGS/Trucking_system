import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useUserAuth } from "../../hooks/useUserAuth";
import LoadingPage from "../../components/LoadingPage";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const { logInAuth } = useUserAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        setFormData({ email: "", password: "" });
        setError(result.message || "Admin login failed. Please try again.");
        return;
      };
      if(result.role === "user"){
        setError("Admin Only");
        setFormData({ email: "", password: "" });
        return;
      };
      setIsLoading(true);
      logInAuth(result.accessToken);
     
    } catch (err) {
      setError(
        err.message || "Admin login failed. Please check your credentials.",
      );
    } 
  };

   const handleLoadingComplete = () => {
      navigate("/admin/orders");
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
        <div className="form-layout admin-slot">
          <h1>ADMIN ACCESS ONLY</h1>
          <p className="form-subtitle">
            This page is for authorized administrators only.
            <br />
            Unauthorized access is prohibited.
          </p>

          {error && <div className="form-error">{error}</div>}

          <form id="admin-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="admin-username">Admin Username</label>
              <input
                type="email"
                id="admin-username"
                name="email"
                placeholder="e.g SSK TRUCKING@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="admin-password">Password</label>
              <input
                type="password"
                id="admin-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-admin" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Log In as Admin"}
            </button>
          </form>

          <p className="switch-link">
            Not an Admin?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("login");
              }}
            >
              Go to Customer Login
            </a>
          </p>
        </div>
      </div>
    </main>
   </div>
  );
}
