import React from "react";
import QRCode from "qrcode.react";
import "./GenerateQR.css";

function random() {
  var len = 20;
  var str = "";
  for (var i = 0; i < len; i++) {
    var rand = Math.floor(Math.random() * 62); 
    var charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); 
    str += String.fromCharCode(charCode); 
  }
  return str;
}

export default function GenerateQr(props) {
  const course_query_param = props.course + '$';
  const qr_props = { value: `http://todo.com/?expire=${props.time}&id=${course_query_param}`, size: 300, level: "H" };

  return (
    <div className="qrcontainer d-flex justify-content-center">
      <QRCode
        size={qr_props.size}
        value={qr_props.value + random()}
        level={qr_props.level}
      />
    </div>
  );
}
