import React, { Component } from "react";
import QRCode from "react-google-qrcode";
import { notification, Alert, Result, Button } from "antd";

const axios = require("axios");

class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: "",
      message: ""
    };
  }

  openNotification = type => {
    notification[type]({
      message: "Kullanıcı Adı yada şifre yanlış !",
      description: "Kullanıcı Adı yada şifre yanlış !"
    });
  };

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
        console.log("bitti", res);
        // alert("qr code bitti");
        return this.openNotification("error");
        window.location.href = "/edit";
      })
      .catch(err => console.log(err));
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
            message:
              "Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklama Bittirin.."
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
          <QRCode data={this.state.qr} size={480} framed />
        ) : (
          <h6>{this.state.message}</h6>
        )}

        <div className="col-md-12 text-center">
          <button className="btn btn-danger" onClick={this.rollcallFinish}>
            Yoklamayı Bitir
          </button>
        </div>
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
