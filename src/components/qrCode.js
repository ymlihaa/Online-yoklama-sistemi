import React, { Component } from "react";
import QRCode from "react-google-qrcode";
import { notification, Alert, Result, Button, message, Icon } from "antd";
import "./components.css";
const axios = require("axios");

class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: "",
      message: ""
    };

  }

  rollcallFinish(id) {
    console.log("rolcalfinish1");
    axios
      .post(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/finish/rollcall?classroomId="+`${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
        }
      )
      .then(res => {
        window.location.href = "/QR/"+`${id}`;
        console.log("bitti", res);
      })
      .catch(err => console.log(err));
  }

  rollcallFinished(id) {
    
    console.log("rolcalfinished");
    
    window.location.href = "/edit/"+`${id}`;

  }

  rollcallStart(id) {
    this.setState({ message: "Yükleniyor.." });
    const token = localStorage.getItem("TOKEN");

    axios
      .post(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/start/rollcall?classroomId="+`${id}`,
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
        let id= this.props.match.params.id;
        console.log(error.response.status);
        if ((error.response.status = 400))
          this.setState({
            message: (
              <Result
                status="404"
                title="QR CODE ÜRETİLMEDİ !"
                subTitle="Bu Yoklama Daha Önce Başlatılmış. Lütfen Yoklamayı Bittirin.."
                extra={
                  <Button type="primary" onClick={this.rollcallFinish(id)}>
                    YOKLAMA GÜNCELLE
                  </Button>
                }
              />
            )
          });
      });
  }
  componentDidMount() {
    let id= this.props.match.params.id;
    this.rollcallStart(id);
  }

  render() {
    let id= this.props.match.params.id;
    return ( 
      <div className="qrCode text-center">
          <div>
            <QRCode data={this.state.qr} size={480} framed />
            <div className="qrButton">
              <button
                className=" btn btn-danger"
                onClick={()=>this.rollcallFinished(id)}
              >
                Yoklamayı Bitir
              </button>
              <button
                type="button"
                className="space btn btn-danger"
                onClick={() => {
                  localStorage.clear();
                  this.props.history.push("/");
                }}
              >
                Log-Out
              </button>
            </div>
          </div>
        
      </div>)
    
  }
}
export default QR;
