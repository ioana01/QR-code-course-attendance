import React from "react";
import QRCode from "qrcode.react";
import "./GenerateQR.css";

function random() {
  var len = 20;
  var str = "";
  for (var i = 0; i < len; i++) {
    // Loop `len` times
    var rand = Math.floor(Math.random() * 62); // random: 0..61
    var charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // Get correct charCode
    str += String.fromCharCode(charCode); // add Character to str
  }
  return str;
}

export default function GenerateQr() {
  const props = { value: "http://todo.com/?expire=", size: 300, level: "H" };

  return (
    <div className="qrcontainer">
      <QRCode
        size={props.size}
        value={props.value + random()}
        level={props.level}
      />
    </div>
  );
}
