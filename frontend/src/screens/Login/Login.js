import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import axios from "axios";
import "./Login.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  // Forgot Password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.id[0] === "S") navigate("/student");
      else if (userInfo.id[0] === "F") navigate("/faculty");
      else if (userInfo.id[0] === "W") navigate("/warden");
      else if (userInfo.id[0] === "A") navigate("/admin");
      else navigate("/security");
    }
  }, [history, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Forgot Password Handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setForgotError("");

    if (!forgotEmail.trim()) {
      setForgotError("Please enter your email!");
      return;
    }
    if (!newPassword.trim()) {
      setForgotError("Please enter a new password!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters!");
      return;
    }

    setForgotLoading(true);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/resetpassword",
        { email: forgotEmail, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );
      setForgotMessage("✅ Password reset successfully! Please login.");
      setForgotEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotMessage("");
      }, 2000);
    } catch (err) {
      setForgotError(
        err.response?.data?.message || "❌ Email not found. Please try again."
      );
    }
    setForgotLoading(false);
  };

  return (
    <div className="entry-page">

      {/* ── Login Form ── */}
      <form onSubmit={submitHandler}>
        <h2>Welcome Back!</h2>
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </li>
            <li>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </li>
            <li style={{ display: "inline-block" }}>
              {showError && (
                <p
                  className="error"
                  style={{ color: "red", fontSize: "small", fontWeight: "bold" }}
                >
                  Wrong credentials! Please try again.
                </p>
              )}
            </li>
          </ul>
        </fieldset>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password Link */}
        <p
          onClick={() => setShowForgotModal(true)}
          style={{
            textAlign: "center", marginTop: "12px",
            color: "#0e3386", cursor: "pointer",
            fontSize: "0.9rem", fontWeight: "bold",
            textDecoration: "underline"
          }}
        >
          Forgot Password?
        </p>
      </form>

      {/* ── Forgot Password Modal ── */}
      {showForgotModal && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 9999
        }}>
          <div style={{
            background: "white", borderRadius: "15px",
            padding: "30px", width: "90%", maxWidth: "420px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            position: "relative"
          }}>

            {/* Close Button */}
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotError("");
                setForgotMessage("");
                setForgotEmail("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              style={{
                position: "absolute", top: "12px", right: "15px",
                background: "red", color: "white",
                border: "none", borderRadius: "50%",
                width: "30px", height: "30px",
                cursor: "pointer", fontWeight: "bold", fontSize: "1rem"
              }}
            >✕</button>

            <h3 style={{ color: "#0e3386", marginBottom: "20px", textAlign: "center" }}>
              🔒 Reset Password
            </h3>

            <form onSubmit={handleForgotPassword}>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "10px",
                    borderRadius: "8px", border: "1px solid #ddd",
                    boxSizing: "border-box"
                  }}
                  required
                />
              </div>

              {/* New Password */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  New Password:
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "10px",
                    borderRadius: "8px", border: "1px solid #ddd",
                    boxSizing: "border-box"
                  }}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  Confirm Password:
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "10px",
                    borderRadius: "8px", border: "1px solid #ddd",
                    boxSizing: "border-box"
                  }}
                  required
                />
              </div>

              {/* Error / Success Message */}
              {forgotError && (
                <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                  {forgotError}
                </p>
              )}
              {forgotMessage && (
                <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
                  {forgotMessage}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={forgotLoading}
                style={{
                  width: "100%", padding: "12px",
                  background: forgotLoading ? "#888" : "#0e3386",
                  color: "white", border: "none",
                  borderRadius: "8px", fontSize: "1rem",
                  fontWeight: "bold", cursor: forgotLoading ? "not-allowed" : "pointer"
                }}
              >
                {forgotLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;