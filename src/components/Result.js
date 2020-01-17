import React, { Component } from "react";
import Table from "./Table";
import Image from "./Image";
import avatar from "../avatar.jpg";
import Checkbox from "./Checkbox";
import { withRouter } from "react-router-dom";
import teachAvatar from "../teachAvatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Result, Button } from "antd";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';
const axios = require("axios");

class ResultPage extends Component {
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

export default ResultPage;
