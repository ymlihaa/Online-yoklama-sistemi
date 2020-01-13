import React, { Component } from "react";
import { notification, Alert, Result, Button, message, Icon } from "antd";

function QrFinish() {
  return (
    <div className="qrFinishContainer">
      <Result
        icon={<Icon type="smile" theme="twoTone" />}
        title="Harika, yoklama başarıyla sonlandırıldı !"
        extra={
          <Button
            type="primary"
            onClick={() => (window.location.href = "/edit")}
          >
            Next
          </Button>
        }
      />
    </div>
  );
}
export default QrFinish;
