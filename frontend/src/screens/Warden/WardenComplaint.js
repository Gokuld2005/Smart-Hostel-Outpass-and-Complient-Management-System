import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getWardenComplaints,
  resolveComplaint,
  rejectComplaint,
} from "../../actions/complaintActions";
import "./Warden.css";

const WardenComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState({});
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getWardenComplaints(userInfo.objectId);
      setComplaints(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveComplaint(id, comment[id] || "");
      setMessage("✅ Complaint Resolved!");
      fetchComplaints();
    } catch (err) {
      setMessage("❌ Error occurred.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectComplaint(id, comment[id] || "");
      setMessage("✅ Complaint Rejected!");
      fetchComplaints();
    } catch (err) {
      setMessage("❌ Error occurred.");
    }
  };

  const getStatusColor = (status) => {
    if (status === "RESOLVED") return "#28a745";
    if (status === "REJECTED") return "#dc3545";
    return "#fd7e14";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>

      {/* ── Full Image Modal ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 9999,
            cursor: "pointer"
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={selectedImage}
              alt="Full Evidence"
              style={{
                maxWidth: "90vw", maxHeight: "90vh",
                borderRadius: "10px",
                boxShadow: "0 0 30px rgba(255,255,255,0.3)"
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute", top: "-15px", right: "-15px",
                background: "red", color: "white",
                border: "none", borderRadius: "50%",
                width: "35px", height: "35px",
                cursor: "pointer", fontWeight: "bold", fontSize: "1.1rem"
              }}
            >✕</button>
          </div>
        </div>
      )}

      {/* ── Main Card ── */}
      <div style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#0e3386", marginBottom: "20px" }}>
          📋 Student Complaints
        </h3>

        {message && (
          <p style={{
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold", marginBottom: "15px"
          }}>
            {message}
          </p>
        )}

        {complaints.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            No complaints found.
          </p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              borderLeft: `5px solid ${getStatusColor(c.status)}`
            }}>

              {/* ── Header ── */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "12px"
              }}>
                <span style={{ fontWeight: "bold", color: "#0e3386", fontSize: "1.1rem" }}>
                  {c.studentId?.name} ({c.studentId?.id})
                </span>
                <span style={{
                  background: getStatusColor(c.status),
                  color: "white", padding: "4px 12px",
                  borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold"
                }}>
                  {c.status}
                </span>
              </div>

              {/* ── Student Info ── */}
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Room:</strong> {c.studentId?.room} &nbsp;|&nbsp;
                <strong>Dept:</strong> {c.studentId?.dept} &nbsp;|&nbsp;
                <strong>Year:</strong> {c.studentId?.year}
              </p>

              {/* ── Category & Description ── */}
              <p style={{ margin: "8px 0" }}>
                <strong>Category:</strong> {c.category}
              </p>
              <p style={{ margin: "8px 0", color: "#333" }}>
                <strong>Description:</strong> {c.description}
              </p>

              {/* ── Evidence Image ── */}
              {c.image && (
                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "8px", color: "#0e3386" }}>
                    📎 Evidence Image:
                  </p>
                  <img
                    src={c.image}
                    alt="Evidence"
                    onClick={() => setSelectedImage(c.image)}
                    style={{
                      width: "100%", maxHeight: "220px",
                      objectFit: "contain", borderRadius: "8px",
                      border: "2px solid #0e3386", cursor: "pointer",
                      transition: "opacity 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.opacity = "0.85"}
                    onMouseOut={(e) => e.target.style.opacity = "1"}
                  />
                  <small style={{ color: "#888" }}>
                    🔍 Click image to view full size
                  </small>
                </div>
              )}

              {/* ── Warden Comment (if resolved/rejected) ── */}
              {c.wardenComment && (
                <p style={{
                  color: "#555", fontStyle: "italic",
                  marginTop: "8px", padding: "8px",
                  background: "#f8f9fa", borderRadius: "5px"
                }}>
                  💬 Your Comment: {c.wardenComment}
                </p>
              )}

              {/* ── Date ── */}
              <small style={{ color: "#999" }}>
                🕐 {new Date(c.createdAt).toLocaleDateString()}
              </small>

              {/* ── Action Buttons (PENDING only) ── */}
              {c.status === "PENDING" && (
                <div style={{ marginTop: "15px" }}>
                  <input
                    type="text"
                    placeholder="Add a comment (optional)"
                    value={comment[c._id] || ""}
                    onChange={(e) =>
                      setComment({ ...comment, [c._id]: e.target.value })
                    }
                    style={{
                      width: "100%", padding: "10px",
                      borderRadius: "8px", border: "1px solid #ddd",
                      marginBottom: "10px", boxSizing: "border-box"
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleResolve(c._id)}
                      style={{
                        flex: 1, padding: "10px",
                        background: "#28a745", color: "white",
                        border: "none", borderRadius: "8px",
                        fontWeight: "bold", cursor: "pointer",
                        fontSize: "1rem"
                      }}
                    >
                      ✅ Resolve
                    </button>
                    <button
                      onClick={() => handleReject(c._id)}
                      style={{
                        flex: 1, padding: "10px",
                        background: "#dc3545", color: "white",
                        border: "none", borderRadius: "8px",
                        fontWeight: "bold", cursor: "pointer",
                        fontSize: "1rem"
                      }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WardenComplaint;