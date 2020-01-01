import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Button, Tooltip } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

class Logout extends Component {
  render() {
    return (
      <div className="text-center">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            event => (window.location.href = "/");
          }}
        >
          {localStorage.removeItem("Token")}
          Log-Out
        </button>
      </div>
    );
  }
}
export default Logout;
