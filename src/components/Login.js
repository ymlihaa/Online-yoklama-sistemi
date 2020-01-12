import React from "react";
import "antd/dist/antd.css";
import "./components.css";
import Image from "./Image";
import Logo from "../logo.png";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { notification } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");

class NormalLoginForm extends React.Component {
  addStorage(TOKEN, IMG_URL, NAME, SURNAME, ID) {
    localStorage.setItem("TOKEN", TOKEN);
    localStorage.setItem("IMG", IMG_URL);
    localStorage.setItem("NAME", NAME);
    localStorage.setItem("SURNAME", SURNAME);
    localStorage.setItem("ID", ID);
  }

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

  navigate;

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
            // console.log("res", res);
            this.addStorage(
              res.data.result.jwt,
              res.data.result.userDTO.imageUrl,
              res.data.result.userDTO.name,
              res.data.result.userDTO.surname,
              res.data.result.userDTO.user.id
            );
            if (res.data.result) {
              console.log("result sayfasına yönlendirmeden 1 satır önce");
              return this.props.history.push("/result");
            }
          });
      } else {
        return this.openNotification("error");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-container">
        <div className=" loginBox ">
          <div className="sub-loginBox">
            <Image
              width={350}
              height={300}
              path={Logo}
              class={"rounded mx-auto d-block"}
            />

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
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
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
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
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
                    className="login-form-button input login-button"
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
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
