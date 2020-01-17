import React, { Component } from "react";
import { Table, Button, Icon, Tooltip, Tag, Alert, Result, Badge, Menu, Dropdown, } from "antd";
import "antd/dist/antd.css";

const axios = require("axios");

class RollCalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
        let id = this.props.match.params.id;
        const token = localStorage.getItem("TOKEN");
        axios.get(
            `http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/teachers/classrooms/${id}/rollcalls`,

            {
                headers: { Authorization: "Bearer " + token }
            }
        )
            .then(res => {
                let getlst = res.data.result.reverse();
                this.setState({ data: getlst })
                // let list = [];
                // getlst.forEach(f=>{
                //    f.inComingStudent.forEach(e => {
                //         let x = {
                //             key: e.id,
                //             studentNo: e.studentNo,
                //             current_State: 1
                //         };
                //         list.push(x);

                //     });
                //     f.nonStudent.forEach(e => {
                //         let x = {
                //             key: e.id,
                //             studentNo: e.studentNo,
                //             current_State: 0
                //         };
                //         list.push(x);
                //     });

                // })


            })
            .catch(err => console.log(err));


    }



    currentSatate = (...theArgs) => {
        let count = 0;
        for (let i = 0; i < theArgs.length; i++) {
            if (theArgs[i].current_State == 1) {
                count++;
            }
        }
        return count;
    };
    getList() {
        return (<> {this.state.data.map((item, index) => (

            <tr>
                <th scope="row">{index}</th>
                <td>{item.studentNo}</td>
                {(item.current_State == 1) ? <td>Geldi</td> :
                    <td>Gelmedi</td>}
            </tr>
        ))}</>)
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
    render() {
        const TOKEN = localStorage.getItem("TOKEN");

        const expandedRowRender = record => <Table
        className="components-table-demo-nested"
        columns={xcolumns}
        dataSource={record.sublist}
    />;
    const xcolumns = [
        { title: 'Öğrenci No', dataIndex: 'studentNo', key: 'studentNo' },
        { title: 'Durum', dataIndex: 'current_State', key: 'current_State',
         render: tags => (
            <span>
              <Tooltip placement="bottom" title={this.text(tags).toUpperCase()}>
                <Tag color={this.color(tags)}>{this.icon(tags)}</Tag>
              </Tooltip>
            </span>
          ) },
    ];
        const columns = [
            { title: 'Yoklamalar', dataIndex: 'name', key: 'name' }
        ];
        const data = [];
        this.state.data.forEach(f => {
            let list = [];

            f.inComingStudent.forEach(e => {
                let x = {
                    key: e.id,
                    studentNo: e.studentNo,
                    current_State: 1
                };
                list.push(x);

            });
            f.nonStudent.forEach(e => {
                let x = {
                    key: e.id,
                    studentNo: e.studentNo,
                    current_State: 0
                };
                list.push(x);
            });


            data.push({
                key: f.id,
                name: '#' + f.id+ ". Yoklama",
                sublist:list
          });
        })


        return (
            <div className="main-container shadow-lg p-3 mb-5 bg-white rounded">
            <div className="container">
           
              <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}
            />
              <div className="text-center">
              <button
                  type="button"
                  className="btn btn-info"
                  
              style={{margin:5}}
                  onClick={() => {
                    this.props.history.push("/result");
                  }}
                >
                  Geri
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    localStorage.clear();
                    this.props.history.push("/");
                  }}
                >
                  Log-Out
                </button>
              </div>
            </div>
          </div>
           

        )
    }
}

export default RollCalls;
