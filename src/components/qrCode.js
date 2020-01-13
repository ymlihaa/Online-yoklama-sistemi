import React, { Component } from "react";
import QRCode from "react-google-qrcode";
import { notification, Alert, Result, Button, message, Icon } from "antd";

const axios = require("axios");
const key = "updatable";

const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};

class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: "",
      message: "",
      finish: false
    };
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
        this.setState({ finish: true });

        console.log("bitti", res);
      })
      .catch(err => console.log(err));

    window.location.href = "/QR";
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
                title="QR CODE ÜRETİLEMEDİ !"
                subTitle="Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklama Bittirin.."
                extra={
                  <Button type="primary" onClick={this.rollcallFinish}>
                    YOKLAMA GÜNCELLE
                  </Button>
                }
              />
            )
            // "Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklama Bittirin.."
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
            <button className="btn btn-danger" onClick={this.rollcallFinish}>
              Yoklamayı Bitir
            </button>
          </div>
        ) : this.state.finish == false ? (
          <h6>{this.state.message}</h6>
        ) : (
          <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="Harika, yoklama başarıyla sonlandırıldı !"
            extra={
              <Button
                type="primary"
                onClick={() => (window.location.href = "/edit")}
              >
                Next
              </Button>
            }
          />
        )}

        <div className="col-md-12 text-center"></div>
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
