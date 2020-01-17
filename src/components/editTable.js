import React, { Component } from "react";
import { Table, Button, Icon, Tooltip, Tag, Alert, Result } from "antd";
import "antd/dist/antd.css";

const axios = require("axios");

class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };

  }
  getData(id) {
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
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    let id= this.props.match.params.id;
    //this.getData(id);

    axios
    .post(
      "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/finish/rollcall?classroomId="+`${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
      }
    )
    .then(res => {
      console.log(res);
      let list=[];
      res.data.result.inComingStudent.forEach(e => {
        let x=   {
          key: e.id,
          studentNo:e.studentNo,
          current_State: 1
        };
        list.push(x);
        
      });
      res.data.result.nonStudent.forEach(e => {
        let x=   {
          key: e.id,
          studentNo:e.studentNo,
          current_State: 0
        };
        list.push(x);
      });
       this.setState({data:list})
    })
    .catch(err => {
      console.log(err);
    });
  }

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
  // button = tag =>
  //   tag === 1 ? (
  //     <Button type="danger">Yok yaz</Button>
  //   ) : (
  //     <Button type="primary"  onClick={() => {
  //       axios
  //       .post(
  //         "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/students/manuel",
  //         {
  //           "classroomId":9 ,
  //           "studentId": 2
  //         },
  //         {
  //           headers: { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
  //         }
  //       )
  //       .then(res => {
  //         console.log(res);
         
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //     }}>Var say</Button>
  //   );

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
    const TOKEN = localStorage.getItem("TOKEN");

    const columns = [
      {
        title: "Öğrenci No",
        dataIndex: "studentNo",
        key: "studentNo",
        sorter: (a, b) => a.studentNo - b.studentNo,
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
      // {
      //   title: "İşlem",
      //   dataIndex: "current_State",
      //   key: "user_Action",
      //   render: action => <div>{this.button(action)}</div>
      // }
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

    return TOKEN ? (
      <Table
        className="shadow-lg p-3 mb-5 bg-white rounded Table"
        columns={columns}
        dataSource={this.state.data}
        bordered
        title={() => "Yazılım müh. Güncel konular aktif yoklama listesi."}
        footer={() =>
          "Yoklama listesinde ki imza sayısı: " + this.currentSatate(...data)
        }
      />
    ) : (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
           
          >
            Back Home
          </Button>
        }
      />
    );
  }
}

export default EditTable;
