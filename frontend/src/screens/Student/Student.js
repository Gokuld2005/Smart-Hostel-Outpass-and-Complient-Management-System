import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassStudent } from "../../actions/outpassActions";
import Outpass from "../../components/Outpass";
import { logout } from "../../actions/userActions";
import Navbar from "../../components/Navbar";
import StudentComplaint from "./StudentComplaint";
import "./Student.css";

const Student = ({ search }) => {
  const [activeTab, setActiveTab] = useState("outpass");

  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses } = outpassList;

  const outpassCreate = useSelector((state) => state.outpassCreate);
  const { success: successCreate } = outpassCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("userInfo.studentId : ", userInfo.objectId);
    dispatch(listOutpassStudent(userInfo.objectId));
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <Navbar role="student" />
      <Mainscreen title={`Hello ${userInfo && userInfo.name} !`}>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: "10px", margin: "20px auto"
        }}>
          <button
            onClick={() => setActiveTab("outpass")}
            style={{
              padding: "10px 30px",
              background: activeTab === "outpass" ? "#0e3386" : "white",
              color: activeTab === "outpass" ? "white" : "#0e3386",
              border: "2px solid #0e3386",
              borderRadius: "25px",
              fontWeight: "bold", cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            📋 Outpass
          </button>
          <button
            onClick={() => setActiveTab("complaint")}
            style={{
              padding: "10px 30px",
              background: activeTab === "complaint" ? "#0e3386" : "white",
              color: activeTab === "complaint" ? "white" : "#0e3386",
              border: "2px solid #0e3386",
              borderRadius: "25px",
              fontWeight: "bold", cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            📝 Complaints
          </button>
        </div>

        {/* ── OUTPASS TAB ── */}
        {activeTab === "outpass" && (
          <div style={{
            background: "white",
            padding: "20px",
            margin: "20px auto",
            width: "fit-content",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {outpasses ? outpasses.length ? outpasses.reverse().map((outpass) => (
              <Outpass
                appdate={outpass.createdAt.slice(0, 10)}
                key={outpass._id}
                student={true}
                name={userInfo.name}
                dept={userInfo.dept}
                year={userInfo.year}
                room={userInfo.room}
                fromtime={outpass.from.slice(0, 10)}
                place={outpass.place}
                reason={outpass.reason}
                status={outpass.status}
                totime={outpass.to.slice(0, 10)}
                qrCode={outpass.qrCode}
              />
            )) : (
              <p style={{ textAlign: "center", color: "red" }}>
                No outpasses, come back later
              </p>
            ) : (
              <p style={{ textAlign: "center", color: "red" }}>
                No outpasses, come back later
              </p>
            )}
          </div>
        )}

        {/* ── COMPLAINT TAB ── */}
        {activeTab === "complaint" && (
          <StudentComplaint />
        )}

      </Mainscreen>
    </>
  );
};

export default Student;
