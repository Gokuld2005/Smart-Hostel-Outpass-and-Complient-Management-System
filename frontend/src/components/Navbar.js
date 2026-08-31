import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Navbar = ({ role, homeLink }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  // ── Role config ──
  const roleConfig = {
    student:  { label: "Student Portal",   emoji: "🎓", bg: "#1a56c4", border: "#0e3386" },
    faculty:  { label: "Faculty Portal",   emoji: "👨‍🏫", bg: "#0F6E56", border: "#085041" },
    warden:   { label: "Warden Portal",    emoji: "🏠", bg: "#7B3F00", border: "#5C2E00" },
    security: { label: "Security Portal",  emoji: "🔒", bg: "#6B21A8", border: "#4C1D95" },
    admin:    { label: "Admin Portal",     emoji: "⚙️",  bg: "#B91C1C", border: "#991B1B" },
  };

  const config = roleConfig[role] || { label: "Portal", emoji: "🏫", bg: "#333", border: "#111" };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to={homeLink}>
            <img src="AIT.jpg" alt="Logo" />
          </Link>
        </div>

        {/* ── Role Identity Badge ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: config.bg,
          border: `2px solid ${config.border}`,
          borderRadius: "25px",
          padding: "6px 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}>
          <span style={{ fontSize: "18px" }}>{config.emoji}</span>
          <span style={{
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}>
            {config.label}
          </span>
        </div>

        <div className="navbar-items">
          <div className="navbar-links">
            <Link to={homeLink} className="navbar-item">Home</Link>
            {role !== "security" ? (
              <Link to="/history" className="navbar-item">History</Link>
            ) : (
              <Link to="/history" className="navbar-item">Register</Link>
            )}
            {role === "student" && (
              <Link to="/apply" className="navbar-item">Apply</Link>
            )}
          </div>

          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                alt="Profile"
                className="profile-icon"
              />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {/* Role info in dropdown */}
                <div style={{
                  padding: "10px 15px",
                  background: config.bg,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "13px",
                  borderRadius: "5px 5px 0 0",
                  textAlign: "center"
                }}>
                  {config.emoji} {config.label}
                </div>
                <div className="dropdown-item" onClick={logoutHandler}>
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── Role Banner (below navbar) ── */}
      <div style={{
        background: `linear-gradient(135deg, ${config.bg} 0%, ${config.border} 100%)`,
        color: "#ffffff",
        textAlign: "center",
        padding: "6px",
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "2px",
        textTransform: "uppercase",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}>
        {config.emoji} &nbsp; Smart Hostel — {config.label} &nbsp; {config.emoji}
      </div>
    </>
  );
};

export default Navbar;