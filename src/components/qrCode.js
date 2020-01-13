import React, { Component } from "react";
import QRCode from "react-google-qrcode";
import { notification, Alert, Result, Button, message, Icon } from "antd";
const axios = require("axios");

class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: "",
      message: ""
    };
    this.rollcallFinished = this.rollcallFinished.bind(this);
  }

  rollcallFinish() {
    axios
      .post(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/finish/rollcall?classroomId=10",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
        }
      )
      .then(res => {
        window.location.href = "/QR";
        console.log("bitti", res);
      })
      .catch(err => console.log(err));
  }

  rollcallFinished() {
    axios
      .post(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/finish/rollcall?classroomId=10",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
        }
      )
      .then(res => {
        console.log("bitti", res);
        window.location.href = "/QrFinish";
      })
      .catch(err => {
        console.log(err);
      });
  }

  rollcallStart() {
    this.setState({ message: "Yükleniyor.." });
    const token = localStorage.getItem("TOKEN");

    axios
      .post(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/start/rollcall?classroomId=10",
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(res => {
        console.log(res);
        let code = res.data.result.qrCode;
        console.log(code);
        this.setState({ qr: code });
      })
      .catch(error => {
        console.log(error.response.status);
        if ((error.response.status = 400))
          this.setState({
            message: (
              <Result
                status="404"
                title="QR CODE ÜRETİLMEDİ !"
                subTitle="Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklamayı Bittirin.."
                extra={
                  <Button type="primary" onClick={this.rollcallFinish}>
                    YOKLAMA GÜNCELLE
                  </Button>
                }
              />
            )
          });
      });
  }
  componentDidMount() {
    this.rollcallStart();
  }

  render() {
    return localStorage.getItem("TOKEN") ? (
      <div className="qrCode text-center">
        {this.state.qr.length > 0 ? (
          <div>
            <QRCode data={this.state.qr} size={480} framed />
            <button className="btn btn-danger" onClick={this.rollcallFinished}>
              Yoklamayı Bitir
            </button>
          </div>
        ) : (
          <h6>{this.state.message}</h6>
        )}
      </div>
    ) : (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }
}
export default QR;
