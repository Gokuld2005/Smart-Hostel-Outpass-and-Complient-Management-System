import React, { useState } from "react";
import axios from "axios";
import QrReader from "react-qr-scanner";


const QrScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [outpasses, setOutpasses] = useState([]);
  const [message, setMessage] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data.text);
      const qrCode = data.text;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/qr/?qrCode=${qrCode}`,
        
          {
            code: data,
          }
        );
        setOutpasses(response.data.outpasses);
        setMessage(response.data.message);
        alert(response.data.message);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  // You can access 'outpasses' and 'message' anywhere in the component
  console.log(outpasses);
  console.log(message);

  return (
    <div>
      <h1>Outpass QR Code</h1>
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        {scanResult ? <p>{scanResult}</p> : null}
      </div>
    </div>
  );
};

export default QrScanner;
