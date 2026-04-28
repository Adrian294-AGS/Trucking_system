import React from 'react'
import { useState } from 'react';

export default function SignIn() {
const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/user/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const signInRes = await res.json();
      if (!signInRes.success) {
        setError(signInRes.message);
        setFormData({ email: '', password: '' });
        return;
      }
      alert(signInRes.message);
    } catch (err) {
      console.log("Login error:", err);
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <p className="switch-link">
            No account yet?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signup'); }}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
