import React, { Component } from "react";
import QRCode from "react-google-qrcode";
const axios = require("axios");

class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: '',
      message: '',
    }
  }
  rollcallFinish() {
    axios.post(
      "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/finish/rollcall?classroomId=10", {},
      { headers: { Authorization: 'Bearer ' + localStorage.getItem("Token") } }
    ).then(res => {
      console.log(res);

    }).catch(err => console.log(err))

  }
  rollcallStart() {
    
    this.setState({ message: "Yükleniyor.." });
    const token = localStorage.getItem("Token");

    const model = {
      classroomId: 9
    };

    axios.post(
      "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/start/rollcall?classroomId=10", {},
      { headers: { Authorization: 'Bearer ' + token } }
    ).then(res => {
      console.log(res);
      let code = res.data.result.qrCode;
      console.log(code);
      this.setState({ qr: code });
    }).catch(error => {
      console.log(error.response.status)
      if(error.response.status=400)
      this.setState({ message: "Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklama Bittirin.." });
    })

  }
  componentDidMount() {
    this.rollcallStart();
  }
  render() {


    return (
      <div className="qrCode text-center">
        {this.state.qr.length > 0 ? <QRCode data={this.state.qr} size={480} framed /> : <h6>{this.state.message}</h6>}

        <div className="col-md-12 text-center">

          <button className="btn btn-danger" onClick={this.rollcallFinish}>Yoklamayı Bitir</button>
        </div>
      </div>

    );
  }
}
export default QR;
