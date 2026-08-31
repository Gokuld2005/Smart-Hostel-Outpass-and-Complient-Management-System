import React, { useEffect, useState } from 'react';
import Outpass from '../../components/Outpass'
import { useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassWarden } from "../../actions/outpassActions";
import { logout } from "../../actions/userActions"
import WardenComplaint from "./WardenComplaint";
import ViewHistory from "../../components/Viewhistory";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import './Warden.css'
import Navbar from '../../components/Navbar';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Warden = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [complaintStats, setComplaintStats] = useState({
    total: 0, pending: 0, resolved: 0, rejected: 0
  });

  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses = [] } = outpassList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listOutpassWarden(userInfo.objectId));
    fetchComplaintStats();
    if (!userInfo) navigate("/");
  }, [dispatch, navigate, userInfo]);

  const fetchComplaintStats = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(
        `http://localhost:5000/api/complaints/warden?objectId=${userInfo.objectId}`,
        config
      );
      if (Array.isArray(data)) {
        setComplaintStats({
          total: data.length,
          pending: data.filter(c => c.status === "PENDING").length,
          resolved: data.filter(c => c.status === "RESOLVED").length,
          rejected: data.filter(c => c.status === "REJECTED").length,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ── Outpass Stats ──
  const totalOutpass = outpasses.length;
  const pendingOutpass = outpasses.filter(o => o.status === "REQUESTED1").length;
  const approvedOutpass = outpasses.filter(o => o.status === "APPROVED").length;
  const rejectedOutpass = outpasses.filter(o => o.status === "REJECTED").length;

  const tabStyle = (name) => ({
    padding: "10px 22px",
    background: activeTab === name ? "#0e3386" : "white",
    color: activeTab === name ? "white" : "#0e3386",
    border: "2px solid #0e3386",
    borderRadius: "25px",    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem"
  });

  // ── Chart Data ──
  const doughnutData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [{
      data: [pendingOutpass, approvedOutpass, rejectedOutpass],
      backgroundColor: ["#f59e0b", "#10b981", "#ef4444"],
      borderColor: ["#d97706", "#059669", "#dc2626"],
      borderWidth: 2,
    }]
  };

  const barData = {
    labels: ["Total", "Pending", "Resolved", "Rejected"],
    datasets: [{
      label: "Complaints",
      data: [
        complaintStats.total,
        complaintStats.pending,
        complaintStats.resolved,
        complaintStats.rejected
      ],
      backgroundColor: ["#6366f1", "#f59e0b", "#10b981", "#ef4444"],
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "rgba(0,0,0,0.05)" }
      },
      x: { grid: { display: false } }
    }
  };

  // ── Stat Card Component ──
  const StatCard = ({ icon, label, value, color, bg }) => (
    <div style={{
      background: bg || "white",
      borderRadius: "16px",
      padding: "20px 24px",
      minWidth: "140px",
      flex: 1,
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderLeft: `5px solid ${color}`,
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }}>
      <span style={{ fontSize: "1.8rem" }}>{icon}</span>
      <span style={{ fontSize: "2rem", fontWeight: "800", color }}>{value}</span>
      <span style={{ fontSize: "0.85rem", color: "#555", fontWeight: "600" }}>{label}</span>
    </div>
  );

  return (
    <>
      <Navbar role="warden" homeLink={"/"} />
      <Mainscreen title={`Welcome Back ${userInfo && userInfo.name}`}>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: "10px", margin: "20px auto", flexWrap: "wrap"
        }}>
          <button onClick={() => setActiveTab("dashboard")} style={tabStyle("dashboard")}>
            📊 Dashboard
          </button>
          <button onClick={() => setActiveTab("outpass")} style={tabStyle("outpass")}>
            📋 Outpass
          </button>
          <button onClick={() => setActiveTab("history")} style={tabStyle("history")}>
            📜 History
          </button>
          <button onClick={() => setActiveTab("complaint")} style={tabStyle("complaint")}>
            📝 Complaints
          </button>
        </div>

        {/* ══ DASHBOARD TAB ══ */}
        {activeTab === "dashboard" && (
          <div style={{ padding: "10px 20px", maxWidth: "900px", margin: "0 auto" }}>

            {/* ── Outpass Stats Cards ── */}
            <div style={{
              background: "rgba(255,255,255,0.92)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}>
              <h3 style={{ color: "#0e3386", marginBottom: "16px", fontSize: "1.1rem" }}>
                📋 Outpass Overview
              </h3>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <StatCard icon="📁" label="Total Requests" value={totalOutpass} color="#6366f1" />
                <StatCard icon="⏳" label="Pending" value={pendingOutpass} color="#f59e0b" />
                <StatCard icon="✅" label="Approved" value={approvedOutpass} color="#10b981" />
                <StatCard icon="❌" label="Rejected" value={rejectedOutpass} color="#ef4444" />
              </div>
            </div>

            {/* ── Complaint Stats Cards ── */}
            <div style={{
              background: "rgba(255,255,255,0.92)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}>
              <h3 style={{ color: "#0e3386", marginBottom: "16px", fontSize: "1.1rem" }}>
                📝 Complaint Overview
              </h3>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <StatCard icon="📊" label="Total Complaints" value={complaintStats.total} color="#6366f1" />
                <StatCard icon="⏳" label="Pending" value={complaintStats.pending} color="#f59e0b" />
                <StatCard icon="✅" label="Resolved" value={complaintStats.resolved} color="#10b981" />
                <StatCard icon="❌" label="Rejected" value={complaintStats.rejected} color="#ef4444" />
              </div>
            </div>

            {/* ── Charts ── */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>

              {/* Doughnut Chart — Outpass */}
              <div style={{
                flex: 1, minWidth: "260px",
                background: "rgba(255,255,255,0.92)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
              }}>
                <h3 style={{ color: "#0e3386", marginBottom: "16px", fontSize: "1rem", textAlign: "center" }}>
                  Outpass Status
                </h3>
                {totalOutpass > 0 ? (
                  <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "bottom" } } }} />
                ) : (
                  <p style={{ textAlign: "center", color: "#888" }}>No outpass data yet.</p>
                )}
              </div>

              {/* Bar Chart — Complaints */}
              <div style={{
                flex: 1, minWidth: "260px",
                background: "rgba(255,255,255,0.92)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
              }}>
                <h3 style={{ color: "#0e3386", marginBottom: "16px", fontSize: "1rem", textAlign: "center" }}>
                  Complaint Status
                </h3>
                {complaintStats.total > 0 ? (
                  <Bar data={barData} options={barOptions} />
                ) : (
                  <p style={{ textAlign: "center", color: "#888" }}>No complaint data yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── OUTPASS TAB ── */}
        {activeTab === "outpass" && (
          <>
            {outpasses && outpasses.length > 0 ? outpasses.slice().reverse().map((outpass) => (
              <Outpass
                key={outpass._id}
                id={outpass._id}
                student={false}
                name={outpass.studentId.name}
                dept={outpass.studentId.dept}
                year={outpass.studentId.year}
                room={outpass.studentId.room}
                fromtime={outpass.from.slice(0, 10)}
                totime={outpass.to.slice(0, 10)}
                place={outpass.place}
                reason={outpass.reason}
                status={outpass.status}
                appdate={outpass.createdAt.slice(0, 10)}
              />
            )) : (
              <p style={{ textAlign: "center", color: "red" }}>
                No outpasses, come back later
              </p>
            )}
          </>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === "history" && (
          <ViewHistory />
        )}

        {/* ── COMPLAINT TAB ── */}
        {activeTab === "complaint" && (
          <WardenComplaint />
        )}

      </Mainscreen>
    </>
  );
};

export default Warden;