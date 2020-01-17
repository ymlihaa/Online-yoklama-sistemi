import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table, Button, Icon, Tooltip, Select } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./components.css";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
const axios = require("axios");

const { Option } = Select;
let arr = [];

function onChange(value) {
  console.log(`selected ${value}`);
  value === "Parmak izi"
    ? (window.location.href = "/edit")
    : (window.location.href = "/QR");
}



class HomeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  columns = [
    {
      title: "Ders Kodu",
      dataIndex: "ders_Code",
      key: "ders_Code"
    },
    {
      title: "Ders Adı",
      className: "link",
      dataIndex: "ders_Name",
      key: "ders_Name",
      render: text => <Button type="link">{text}</Button>
    },
    {
      title: "Şube",
      dataIndex: "ders_Branch",
      key: "ders_Branch"
    },
    {
      title: "AKTS-Krd",
      dataIndex: "ders_AKTSKrd",
      key: "ders_AKTSKrd"
    },
    {
      title: "Öğrenci Sayısı",
      dataIndex: "ogr_Count",
      key: "ogr_Count"
    },
    {
      title: "İşlem",
      dataIndex: "key",
      key: "action",
      render: key => {

        const { history } = this.props;
        return (
          <div>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {

                window.location.href = "/qr/" + `${key}`;
              }}
            >
              Yoklamayı Başlat
              </button>
              <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{margin:5}}
              onClick={() => {

                window.location.href = "/rollcalls/" + `${key}`;
              }}
            >
              Yoklamalar
              </button>
            
          </div>
        )
      }
    }
  ];
  addTableData(arr, length) {
    let xdata = [];
    for (let i = 0; i < length; i++) {
      xdata.push({
        key: arr[i].id,
        ders_Code: `${arr[i].cod}`,
        ders_Name: `${arr[i].name}`,
        ders_Branch: `${arr[i].sectionType}`,
        ders_AKTSKrd: `${arr[i].credit}`,
        ogr_Count: `${arr[i].studentCount}`
      });
      this.setState({ data: xdata });
    }
  }

  getData() {
    const token = localStorage.getItem("TOKEN");
    axios
      .get(
        "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms",

        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res => {
        console.log(res);
        arr = res.data.result;
        this.addTableData(arr, arr.length);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {

    this.getData();
  }

  render() {

    const { history } = this.props;
    console.log(this.state.data);
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        title={() => "Aktif Dönemde Verilen Dersler"}
        footer={() => "Toplam ders sayısı: " + this.state.data.length}
      />
    );
  }
}

export default HomeTable;
