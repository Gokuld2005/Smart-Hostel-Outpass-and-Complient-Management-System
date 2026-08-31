import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { submitComplaint, getStudentComplaints } from "../../actions/complaintActions";
import "./Student.css";

const StudentComplaint = () => {
  const [category, setCategory] = useState("Hostel related");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getStudentComplaints(userInfo.objectId);
      setComplaints(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage("❌ Image size should not exceed 2MB!");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setMessage("❌ Please enter a description before submitting");
      return;
    }
    setLoading(true);
    try {
      // Convert image to base64
      let imageBase64 = null;
      if (image) {
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(image);
        });
      }

      await submitComplaint(userInfo.objectId, category, description, imageBase64);
      setMessage("✅ Complaint submitted successfully!");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      fetchComplaints();
    } catch (err) {
      setMessage("❌ Error occurred. Try again.");
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === "RESOLVED") return "#28a745";
    if (status === "REJECTED") return "#dc3545";
    return "#fd7e14";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>

      {/* ── Submit Form ── */}
      <div style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: "15px",
        padding: "25px",
        marginBottom: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#0e3386", marginBottom: "20px" }}>📝 Submit Complaint</h3>
        <form onSubmit={handleSubmit}>

          {/* Category */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
            >
              <option>Hostel related</option>
              <option>Food related</option>
              <option>Maintenance related</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter your complaint details here..."
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", resize: "vertical" }}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              📎 Evidence Image (Optional):
            </label>

            {/* Upload Box */}
            {!imagePreview ? (
              <label style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                border: "2px dashed #0e3386", borderRadius: "10px",
                padding: "30px", cursor: "pointer",
                background: "#f8f9ff", color: "#0e3386"
              }}>
                <span style={{ fontSize: "2.5rem" }}>📷</span>
                <span style={{ fontWeight: "bold", marginTop: "8px" }}>Click to upload image</span>
                <span style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}>
                  JPG, PNG, JPEG (Max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            ) : (
              /* Image Preview */
              <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%", maxHeight: "250px",
                    objectFit: "contain", borderRadius: "10px",
                    border: "2px solid #0e3386"
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute", top: "8px", right: "8px",
                    background: "red", color: "white",
                    border: "none", borderRadius: "50%",
                    width: "30px", height: "30px",
                    cursor: "pointer", fontWeight: "bold", fontSize: "1rem"
                  }}
                >✕</button>
                <p style={{ color: "#28a745", marginTop: "5px", fontSize: "0.85rem" }}>
                  ✅ {image?.name}
                </p>
              </div>
            )}
          </div>

          {/* Message */}
          {message && (
            <p style={{
              color: message.includes("✅") ? "green" : "red",
              fontWeight: "bold", marginBottom: "10px"
            }}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: loading ? "#888" : "#0e3386",
              color: "white", border: "none",
              borderRadius: "8px", fontSize: "1rem",
              fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>

      {/* ── Complaints List ── */}
      <div style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#0e3386", marginBottom: "20px" }}>📋 My Complaints</h3>
        {complaints.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No complaints yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} style={{
              border: "1px solid #ddd", borderRadius: "10px",
              padding: "15px", marginBottom: "15px",
              borderLeft: `5px solid ${getStatusColor(c.status)}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold", color: "#0e3386" }}>{c.category}</span>
                <span style={{
                  background: getStatusColor(c.status),
                  color: "white", padding: "3px 12px",
                  borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold"
                }}>{c.status}</span>
              </div>
              <p style={{ margin: "8px 0", color: "#333" }}>{c.description}</p>

              {/* Evidence Image */}
              {c.image && (
                <img
                  src={c.image}
                  alt="Evidence"
                  style={{
                    width: "100%", maxHeight: "200px",
                    objectFit: "contain", borderRadius: "8px",
                    border: "1px solid #ddd", marginTop: "8px"
                  }}
                />
              )}

              {c.wardenComment && (
                <p style={{ color: "#555", fontStyle: "italic", marginTop: "8px" }}>
                  💬 Warden: {c.wardenComment}
                </p>
              )}
              <small style={{ color: "#999" }}>
                🕐 {new Date(c.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentComplaint;