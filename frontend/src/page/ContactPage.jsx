import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useUserAuth } from "../hooks/useUserAuth";

export default function ContactPage() {
  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Contact form submission:", formData);
      // 🔹 Replace with your actual API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HomeNavbar user={user} />
      <main className="page">
        <div className="page-content">
          <h1 className="page-title">Contact us</h1>
          <p className="page-sub">
            We are here to help you, send a message below.
          </p>

          <div className="contact-layout">
            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input dark-input"
                  placeholder="e.g Alexandrie Abon"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input dark-input"
                  placeholder="e.g Alexandrie.abon@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input dark-input"
                  placeholder="e.g Inquiry about rental"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="5"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {submitStatus === "success" && (
                <div className="form-success">
                  ✅ Message sent successfully! We'll reply soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="form-error">
                  ❌ Failed to send. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="btn-send"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Contact Info Box */}
            <div className="contact-info-box">
              <div className="info-title">Our Contact Information</div>

              <div className="info-item">
                <div className="info-label">Address:</div>
                <div className="info-value">
                  29 Espiritu St. Plaridel,
                  <br />
                  Santiago City, Isabela, Philippines
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Phone:</div>
                <div className="info-value">+63 905 579 1650</div>
              </div>

              <div className="info-item">
                <div className="info-label">Email:</div>
                <div className="info-value">SSKtrucking@gmail.com</div>
              </div>

              <div className="info-item">
                <div className="info-label">Business Hours:</div>
                <div className="info-value">Mon–Sat: 7:00 AM – 9:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
