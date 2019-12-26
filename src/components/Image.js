import React from "react";
import { image } from "../teachAvatar.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Image(props) {
  return (
    <div>
      <img
        width={props.width}
        height={props.height}
        src={props.path ? props.path : "../teachAvatar.png"}
        className={props.class}
        alt="..."
      />
    </div>
  );
}
export default Image;
