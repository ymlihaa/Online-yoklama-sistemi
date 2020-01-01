import React, { Component } from "react";
import QRCode from "react-google-qrcode";
const axios = require("axios");

class QR extends Component {
  render() {
    const url =
      "ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/start/rollcall";

    axios.get(url).then(obj => {
      console.log(obj.data);
    });

    return (
      <div className="qrCode">
        <QRCode data="HASAN" size={480} framed />
      </div>
    );
  }
}
export default QR;
