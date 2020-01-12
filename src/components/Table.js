import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table, Button, Icon, Tooltip, Select } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./components.css";
const axios = require("axios");

const { Option } = Select;
let arr = [];

function onChange(value) {
  console.log(`selected ${value}`);
  value === "Parmak izi"
    ? (window.location.href = "/edit")
    : (window.location.href = "/QR");
}

const columns = [
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
    dataIndex: "",
    key: "user_Action",
    render: action => (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="YOKLAMA TÜRÜ SEÇİNİZ !"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="Parmak izi">Parmak İzi</Option>
          <Option value="QR code">QR Code</Option>
        </Select>
        ,
        <Tooltip placement="bottom" title="Yoklamayı durdur!">
          <Button
            type="danger"
            shape="circle"
            icon="pause-circle"
            size="large"
            style={{ marginLeft: "15px", paddingBottom: "10px" }}
            disabled
          />
        </Tooltip>
      </div>
    )
  }
];

class HomeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  addTableData(arr, length) {
    let xdata = [];
    for (let i = 0; i < length; i++) {
      xdata.push({
        key: i,
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
        arr = res.data.result;
        this.addTableData(arr, arr.length);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log(this.state.data);
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        bordered
        title={() => "Aktif Dönemde Verilen Dersler"}
        footer={() => "Toplam ders sayısı: " + this.state.data.length}
      />
    );
  }
}

export default HomeTable;
