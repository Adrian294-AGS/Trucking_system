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
      </main>
    </div>
  );
}
