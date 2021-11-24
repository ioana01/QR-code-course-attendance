import React from "react";
import "./Popup.css";
import GenerateQr from "../GenerateQR/GenerateQR";
import PieChart from "../Charts/PieChart/PieChart";

function renderOption(props) {
  if (props.button === "GenerateQR" ) {
    return <GenerateQr time={props.time} course={props.course}/>;
  } else if (props.button === "Statistics") {
    return <PieChart time={props.time} course={props.course}> </PieChart>;
  }
}

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
          { renderOption(props) }
      </div>
    </div>
  );
};

export default Popup;
