import React, { Component } from "react";
import QRCode from "react-google-qrcode";

class QR extends Component {
  render() {
    return (
      <div className="qrCode">
        <QRCode data="HASAN" size={480} framed />
      </div>
    );
  }
}
export default QR;
