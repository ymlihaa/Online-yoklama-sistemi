import React, { Component } from "react";
import Table from "./Table";
import Image from "./Image";
import avatar from "../avatar.jpg";
import Checkbox from "./Checkbox";
import { withRouter } from "react-router-dom";
import teachAvatar from "../teachAvatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "antd";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true
    }; /* isTrue : true yaparak tabloyu görüntüleyebilirsiniz.  */
  }

  // ---ÖNEMLİ--- GÖREV
  /*
  open Table Fonksiyonunun yazılma sebebi :
  Eğerki current state true olursa table'ı göster mantığını çalıştırabilmek içindir.
  Burada currentState parametresine checkbox componentinde seçim yapıldıktan sonra true değeri atanacaktır.
  Bunu şu anda yapamadım.
  İlerlemesi gereken 1 adım .  
  */

  openTable(currentState) {
    console.log("true");
    this.setState({
      isTrue: currentState
    });
  }

  // shadow-lg p-3 mb-5 bg-white rounded

  render() {
    const element =
      this.state.isTrue === true ? <Table /> : console.log("açma");

    return localStorage.getItem("Token") ? (
      <div className="main-container shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container">
          <div className="image">
            <Image
              width={200}
              height={200}
              path={this.props.location.state.Url}
              class={"image"}
            />
          </div>
          <div className=" checkbox ">
            <h1 className="text-center">
              {this.props.location.state.Name}{" "}
              {this.props.location.state.Surname}{" "}
            </h1>
          </div>
          <div className="text-center checkbox ">
            {/* <Checkbox onTableOpen={this.openTable} /> */}
          </div>
          {element}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("Token");
                this.props.history.push("/");
              }}
            >
              Log-Out
            </button>
          </div>
        </div>
      </div>
    ) : (
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />
    );
  }
}

export default Result;
