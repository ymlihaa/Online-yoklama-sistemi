import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import Image from "./Image";
import Logo from "../logo.png";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { notification } from "antd";

const axios = require("axios");

class NormalLoginForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  openNotification = type => {
    notification[type]({
      message: "Kullanıcı Adı yada şifre yanlış !",
      description: "Kullanıcı Adı yada şifre yanlış !"
    });
  };

  Validate = () => {
    this.props.form.validateFields((err, values) => {
      const model = {
        username: values.username,
        password: values.password
      };
      if (!err) {
        const response = axios
          .post(
            "http://ec2-3-15-21-159.us-east-2.compute.amazonaws.com:8080/ymgk-api2/login/user",
            model
          )
          .then(res => {
            console.log("res", res);
            localStorage.setItem("Token", res.data.result.jwt);
            if (res.data.result) {
              console.log("burada");
              return this.props.history.push("/result");
            }
            // return res.data.suc
            //   ? this.props.history.push("/result")
            //   : this.openNotificationWithIcon("error");
          });
      } else {
        return this.openNotification("error");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Image width={580} heigth={500} path={Logo} />
        <div className="form">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item className="input">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item className="input">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>

            <Form.Item className="button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button input"
                onClick={() => {
                  this.Validate();
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
