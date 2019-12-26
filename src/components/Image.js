import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Image(props) {
  return (
    <div>
      <img
        width={props.width}
        height={props.height}
        src={props.path}
        className={props.class}
        alt="..."
      />
    </div>
  );
}
export default Image;
