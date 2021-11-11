import React from "react";
import "./Popup.css";
import GenerateQr from "../GenerateQR/GenerateQR";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <GenerateQr time={props.time} course={props.course}/>
      </div>
    </div>
  );
};

export default Popup;
