import React, { Component } from "react";
import QRCode from "react-google-qrcode";
const axios = require("axios");

class QR extends Component {
  render() {
    const token = localStorage.getItem("Token");

    const model = {
      classroomId: 9
    };

    const response = axios.post(
      "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/start/rollcall?classroomId=10",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    console.log(response);

    return (
      <div className="qrCode">
        <QRCode data="HASAN" size={480} framed />
      </div>
    );
  }
}
export default QR;
