import React, { useState } from "react";
import Outpass from "../../components/Outpass";
import { useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassSecurity } from "../../actions/outpassActions";
import { logout } from "../../actions/userActions";
import "./Security.css";
import QrReader from "react-qr-scanner";
import Navbar from "../../components/Navbar";

const Security = () => {
  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses = [] } = outpassList;
  const [qrCode, setScannedText] = useState("");

  console.log("outpass:", outpasses);
  const handleScan = async (data) => {
    if (data) {
      console.log(data.text);
      dispatch(listOutpassSecurity(data.text));
      setScannedText(data.text);
    }
  };
  // when user logouts , it should go back to login page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  
  const navigate = useNavigate();

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <Navbar role="security" homeLink={"/"} />
      <Mainscreen title={`Security: ${userInfo && userInfo.name}`}>

        <div>
          <h1>Outpass QR Code</h1>
          <div>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
            {qrCode ? <p>{qrCode}</p> : null}
          </div>
        </div>

        {outpasses && (
          <Outpass
            key={outpasses._id}
            id={outpasses._id}
            student={false}
            name={outpasses.studentId && outpasses.studentId.name}
            dept={outpasses.studentId && outpasses.studentId.dept}
            room={outpasses.studentId && outpasses.studentId.room}
            year={outpasses.studentId && outpasses.studentId.year}
            fromtime={outpasses.from && outpasses.from.slice(0, 10)}
            totime={outpasses.to && outpasses.to.slice(0, 10)}
            place={outpasses.place}
            reason={outpasses.reason}
            status={outpasses.status}
            security={true}
            appdate={outpasses.createdAt && outpasses.createdAt.slice(0, 10)}
            inTime={outpasses.status === "ACTIVE" ? true : false}
          />
        )}
      </Mainscreen>
    </>
  );
};

export default Security;
