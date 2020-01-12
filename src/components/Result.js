import React, { Component } from "react";
import Table from "./Table";
import Image from "./Image";
import avatar from "../avatar.jpg";
import Checkbox from "./Checkbox";
import { withRouter } from "react-router-dom";
import teachAvatar from "../teachAvatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "antd";
import Axios from "axios";
const axios = require("axios");

class Result extends Component {
  render() {
    const TOKEN = localStorage.getItem("TOKEN");
    const IMG = localStorage.getItem("IMG");
    const NAME = localStorage.getItem("NAME");
    const SURNAME = localStorage.getItem("SURNAME");
    const ID = localStorage.getItem("ID");

    return TOKEN ? (
      <div className="main-container shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container">
          <div className="image">
            <Image
              width={200}
              height={200}
              path={IMG}
              class={" shadow-lg p-3 mb-5 bg-white rounded image"}
            />
          </div>
          <h1 className="text-center">
            {NAME.toUpperCase()} {SURNAME.toUpperCase()}{" "}
          </h1>
          <Table ID={ID} />
          <div className="text-center">
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
