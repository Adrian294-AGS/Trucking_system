import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    admin_password: "",
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
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        setFormData({ email: "", admin_password: "" });
        setError(result.message || "Admin login failed. Please try again.");
        return;
      };
      navigate("/home");
      alert(result.message);
    } catch (err) {
      setError(
        err.message || "Admin login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                name="admin_password"
                value={formData.admin_password}
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
