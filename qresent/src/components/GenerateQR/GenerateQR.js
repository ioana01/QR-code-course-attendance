import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode.react";
import Popup from "../Popup/Popup";
import "./GenerateQR.css";

export default function generateQr(isOpen, togglePopup) {
  var props = {
    value: "http://facebook.github.io/react/",
    size: 300
  };

  return (
    <div className="qrcontainer">
      <QRCode size={props.size} value={props.value} />
    </div>
  );
}
