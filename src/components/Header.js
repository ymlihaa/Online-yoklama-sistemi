import React from "react";
import { PageHeader } from "antd";
import "./components.css";
// import slogo from "../Slogo.png";
// import Image from "./Image";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <PageHeader
      className="header shadow-sm p-3 mb-5 bg-white rounded"
      style={{
        border: "1px solid rgb(235, 237, 240)"
      }}
      title={
        <div style={{cursor:"pointer"}}
        onClick={() => (window.location.href = "/result")}>
          <b>FIRAT</b> ÜNİVERSİTESİ
        </div>
      }
    />
  );
}
export default Header;

{
  /* <PageHeader
className="header"
style={{
  border: "1px solid rgb(235, 237, 240)"
}}
title={
  <div>
    <b>FIRAT</b> ÜNİVERSİTESİ
  </div>
}
/> */
}
