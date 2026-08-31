import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listOutpassFaculty,
  listOutpassStudent,
  listOutpassWarden,
} from "../actions/outpassActions";
import { listRegister } from "../actions/registerActions";
import Navbar from "./Navbar";

export default function ViewHistory() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses } = outpassList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const registerList = useSelector((state) => state.registerList);
  const { registers } = registerList;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.id[0] === "S") dispatch(listOutpassStudent(userInfo.objectId));
    else if (userInfo.id[0] === "F") dispatch(listOutpassFaculty(userInfo.objectId));
    else if (userInfo.id[0] === "W") dispatch(listOutpassWarden(userInfo.objectId));
    else dispatch(listRegister(userInfo.objectId));
    if (!userInfo) navigate("/");
  }, [dispatch, userInfo, navigate]);

  let DisplayData = null;

  // ── Outpass filter (Student / Faculty / Warden) ──
  if (outpasses && outpasses.length) {
    const filteredOutpasses = outpasses.filter((outpass) => {
      if (!outpass) return false;
      return (
        (outpass.classInchargeId?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.wardenId?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.from?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.to?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.place?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.reason?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.status?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (outpass.studentId?.name?.toLowerCase() || "").includes(search.toLowerCase())
      );
    });

    DisplayData = filteredOutpasses.map((outpass) => (
      <tr key={outpass._id}>
        {userInfo.id[0] !== "S" && <td>{outpass.studentId?.id || ""}</td>}
        {userInfo.id[0] !== "S" && <td>{outpass.studentId?.name || ""}</td>}
        {userInfo.id[0] !== "F" && <td>{outpass.classInchargeId || ""}</td>}
        {userInfo.id[0] !== "W" && <td>{outpass.wardenId || ""}</td>}
        <td>{outpass.from?.slice(0, 10) || ""}</td>
        <td>{outpass.to?.slice(0, 10) || ""}</td>
        <td>{outpass.place || ""}</td>
        <td>{outpass.reason || ""}</td>
        <td>{outpass.status || ""}</td>
      </tr>
    ));
  }

  // ── Register filter (Security) ──
  if (registers && registers.length) {
    const filteredRegisters = registers.filter((register) => {
      // ── null check ──
      if (!register) return false;
      if (!register.outpassId) return false;

      const studentId = register.outpassId?.studentId;
      const year =
        studentId && typeof studentId.year === "number"
          ? studentId.year.toString()
          : "";

      return (
        (studentId?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (studentId?.dept?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (studentId?.room?.toLowerCase() || "").includes(search.toLowerCase()) ||
        year.includes(search.toLowerCase()) ||
        (register.outpassId?.from?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (register.outpassId?.to?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (register.outpassId?.place?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (register.outpassId?.reason?.toLowerCase() || "").includes(search.toLowerCase())
      );
    });

    DisplayData = filteredRegisters.map((register) => {
      // ── null guard ──
      if (!register.outpassId) return null;
      const s = register.outpassId?.studentId;
      return (
        <tr key={register._id}>
          <td>{register.sNo || ""}</td>
          <td>{s?.id || ""}</td>
          <td>{s?.name || ""}</td>
          <td>{s?.dept || ""}</td>
          <td>{s?.year || ""}</td>
          <td>{s?.room || ""}</td>
          <td>{register.outTime || ""}</td>
          <td>{register.inTime || ""}</td>
          <td>{register.outpassId?.place || ""}</td>
          <td>{register.outpassId?.reason || ""}</td>
          <td>{register.outpassId?._id || ""}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <Navbar
        role={
          userInfo.id[0] === "S" ? "student" :
          userInfo.id[0] === "F" ? "faculty" :
          userInfo.id[0] === "W" ? "warden" :
          userInfo.id[0] === "G" ? "security" : ""
        }
        homeLink={
          userInfo.id[0] === "S" ? "/student" :
          userInfo.id[0] === "F" ? "/faculty" :
          userInfo.id[0] === "W" ? "/warden" :
          userInfo.id[0] === "G" ? "/security" : ""
        }
      />

      <div>
        {/* ── Search Bar ── */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          position: "sticky",
          top: "0",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "10px",
          zIndex: 100
        }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid gray",
              width: "300px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* ── Table ── */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "60vh",
          overflow: "auto",
          padding: "10px"
        }}>
          <div style={{ maxWidth: "100%", overflow: "auto" }}>
            {(!DisplayData || DisplayData.length === 0) ? (
              <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                No history found.
              </p>
            ) : (
              <table
                className="table table-striped"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                {/* ── Outpass Header ── */}
                {userInfo.id[0] !== "G" && (
                  <thead style={{ backgroundColor: "#0e3386", color: "white" }}>
                    <tr>
                      {userInfo.id[0] !== "S" && <th style={{ padding: "10px" }}>Student ID</th>}
                      {userInfo.id[0] !== "S" && <th style={{ padding: "10px" }}>Student Name</th>}
                      {userInfo.id[0] !== "F" && <th style={{ padding: "10px" }}>Class Incharge ID</th>}
                      {userInfo.id[0] !== "W" && <th style={{ padding: "10px" }}>Warden ID</th>}
                      <th style={{ padding: "10px" }}>From Date</th>
                      <th style={{ padding: "10px" }}>To Date</th>
                      <th style={{ padding: "10px" }}>Place</th>
                      <th style={{ padding: "10px" }}>Reason</th>
                      <th style={{ padding: "10px" }}>Status</th>
                    </tr>
                  </thead>
                )}

                {/* ── Security Header ── */}
                {userInfo.id[0] === "G" && (
                  <thead style={{ backgroundColor: "#0e3386", color: "white" }}>
                    <tr>
                      <th style={{ padding: "10px" }}>S.No</th>
                      <th style={{ padding: "10px" }}>Student ID</th>
                      <th style={{ padding: "10px" }}>Student Name</th>
                      <th style={{ padding: "10px" }}>Dept</th>
                      <th style={{ padding: "10px" }}>Year</th>
                      <th style={{ padding: "10px" }}>Room</th>
                      <th style={{ padding: "10px" }}>Out Time</th>
                      <th style={{ padding: "10px" }}>In Time</th>
                      <th style={{ padding: "10px" }}>Place</th>
                      <th style={{ padding: "10px" }}>Reason</th>
                      <th style={{ padding: "10px" }}>Outpass ID</th>
                    </tr>
                  </thead>
                )}
                <tbody>{DisplayData}</tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}