import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table, Button, Icon, Tooltip } from "antd";
import { BrowserRouter } from "react-router-dom";

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
    title: "T+U",
    dataIndex: "ders_TU",
    key: "ders_TU"
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
        <Button type="primary" size="large" className="login-button">
          <Icon
            type="play-circle"
            style={{ fontSize: "20px", marginBottom: "5px" }}
          />
          Yoklama Başlat
        </Button>
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

const data = [
  {
    key: 1,
    ders_Code: "YMH459",
    ders_Name: "Yazılım Müh. Güncel Konular",
    ders_Branch: "1",
    ders_AKTSKrd: "6-4",
    ders_TU: "3+2",
    ogr_Count: "60"
  },
  {
    key: 2,
    ders_Code: "YMH315",
    ders_Name: "Veritabanı Yönetim Sis.",
    ders_Branch: "B",
    ders_AKTSKrd: "6-4",
    ders_TU: "3+2",
    ogr_Count: "130"
  },
  {
    key: 3,
    ders_Code: "YMH403",
    ders_Name: "Girişimcilik-II",
    ders_Branch: "1",
    ders_AKTSKrd: "3-2",
    ders_TU: "2+0",
    ogr_Count: "55"
  }
];

class HomeTable extends Component {
  render() {
    return (
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Aktif Dönemde Verilen Dersler"}
        footer={() => "Toplam ders sayısı: " + data.length}
      />
    );
  }
}

export default HomeTable;
