import React, { Component } from "react";
import { Table, Button, Icon, Tooltip, Tag } from "antd";

import "antd/dist/antd.css";

class EditTable extends Component {
  text = tag => (tag === 1 ? "Var" : "Yok");
  color = tag => (tag === 1 ? "green" : "volcano");
  icon = tag =>
    tag === 1 ? (
      <Icon type="check" style={{ fontSize: "15px", paddingBottom: "7px" }} />
    ) : (
      <Icon
        type="exclamation"
        style={{ fontSize: "15px", paddingBottom: "7px" }}
      />
    );
  button = tag =>
    tag === 1 ? (
      <Button type="danger">Yok yaz</Button>
    ) : (
      <Button type="primary">Var say</Button>
    );

  /*
   *  Yoklama listesinde imza atan kişilerin sayısı bulundu
   */
  currentSatate = (...theArgs) => {
    let count = 0;
    for (let i = 0; i < theArgs.length; i++) {
      if (theArgs[i].current_State == 1) {
        count++;
      }
    }
    return count;
  };

  render() {
    const columns = [
      {
        title: "Öğrenci No",
        dataIndex: "ogr_No",
        key: "ogr_No",
        sorter: (a, b) => a.ogr_No - b.ogr_No,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Adı",
        dataIndex: "ogr_Name",
        key: "ogr_Name",
        sorter: (a, b) => a.ogr_Name.length - b.ogr_Name.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Soyadı",
        dataIndex: "ogr_Surname",
        key: "ogr_Surname",
        sorter: (a, b) => a.ogr_Surname.length - b.ogr_Surname.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Devamsızlık Durumu",
        dataIndex: "dvm_Count",
        key: "dvm_Count",
        sorter: (a, b) => a.dvm_Count - b.dvm_Count,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Alış",
        dataIndex: "dvm_State",
        key: "dvm_State",
        sorter: (a, b) => a.dvm_State.length - b.dvm_State.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Sınıfta mı?",
        dataIndex: "current_State",
        key: "current_State",
        sorter: (a, b) => a.current_State - b.current_State,
        sortDirections: ["descend", "ascend"],
        render: tags => (
          <span>
            <Tooltip placement="bottom" title={this.text(tags).toUpperCase()}>
              <Tag color={this.color(tags)}>{this.icon(tags)}</Tag>
            </Tooltip>
          </span>
        )
      },
      {
        title: "İşlem",
        dataIndex: "current_State",
        key: "user_Action",
        render: action => <div>{this.button(action)}</div>
      }
    ];

    const data = [
      {
        key: 1,
        ogr_No: 15541020,
        ogr_Name: "Hikmet",
        ogr_Surname: "Berhuş",
        dvm_Count: 2,
        dvm_State: "Zorunlu",
        current_State: 1
      },
      {
        key: 2,
        ogr_No: 15541070,
        ogr_Name: "Mehmet",
        ogr_Surname: "Tantekin",
        dvm_Count: 0,
        dvm_State: "Zorunlu",
        current_State: 1
      },
      {
        key: 3,
        ogr_No: 15541020,
        ogr_Name: "Ahmet Hüsrev",
        ogr_Surname: "Bulut",
        dvm_Count: 5,
        dvm_State: "Alttan",
        current_State: 0
      },
      {
        key: 4,
        ogr_No: 15541070,
        ogr_Name: "Mücahit",
        ogr_Surname: "Avcı",
        dvm_Count: 4,
        dvm_State: "Zorunlu",
        current_State: 1
      },
      {
        key: 5,
        ogr_No: 15541070,
        ogr_Name: "Hatun",
        ogr_Surname: "Samsa",
        dvm_Count: 2,
        dvm_State: "Alttan",
        current_State: 0
      },
      {
        key: 6,
        ogr_No: 15541070,
        ogr_Name: "Şuayb Yasin",
        ogr_Surname: "Erimhan",
        dvm_Count: 2,
        dvm_State: "Zorunlu",
        current_State: 1
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Yazılım müh. Güncel konular aktif yoklama listesi."}
        footer={() =>
          "Yoklama listesinde ki imza sayısı: " + this.currentSatate(...data)
        }
      />
    );
  }
}

export default EditTable;
