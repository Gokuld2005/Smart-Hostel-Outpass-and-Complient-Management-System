import React, { useEffect, useRef } from "react";
import qrcode from "qrcode";

const QRCodeDisplay = ({ text, handleOverlayClick }) => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    generateQRCode();
  }, [text]);

  const generateQRCode = async () => {
    try {
      const image = await qrcode.toDataURL(text,{ width: 300 });
      qrCodeRef.current.src = image;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="qr-overlay" onClick={handleOverlayClick}>
      <img
        ref={qrCodeRef}
        src=""
        alt="QR Code"
        className="qr-image"
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default QRCodeDisplay;
