import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingPage from "../components/LoadingPage";
import { useToast } from "../context/ToastContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      showToast("warning", "signUp", "Passwords do not match.");
      setFormData({
        ...formData,
        password: "",
        confirm_password: "",
      });
      return;
    }
    try {
      const res = await fetch("/api/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const signUpRes = await res.json();
      if (!signUpRes.success) {
        showToast("warning", "SignUp", signUpRes.message);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
        });
        return;
      }
      setIsLoading(true);
    } catch (error) {
      setError("An error occurred during signup.");
    } 
  };

  const handleReset = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    });
  };

   const handleLoadingComplete = () => {
    setIsLoading(false);
    alert("Success Sign Up");
    navigate("/login");
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
      <div className="page active" id="page-signup">
        <div className="form-section">
          <div className="form-layout">
            <h1>Create an Account</h1>
            <p className="form-subtitle">Fill in the form below to register.</p>

            {error && <div className="form-error">{error}</div>}

            <form
              id="signup-form"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <div className="field">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  style={{ backgroundColor: "#666", color: "#fff" }}
                  type="text"
                  id="signup-name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="signup-email">Email Address</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="signup-phone">Phone Number</label>
                <input
                  type="tel"
                  id="signup-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirm_password"
                  value={formData.confirm_password}
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
                  {isLoading ? "Registering..." : "Register"}
                </button>
                <button type="reset" className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>

            <p className="switch-link">
              Already have an account?{" "}
              <Link
                to={"/login"}
                onClick={(e) => {
                  localStorage.setItem("navbarChanged", "/login");
                }}
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
