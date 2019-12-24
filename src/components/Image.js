import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Image(props) {
  return (
    <div>
      <img
        width={props.width}
        height={props.height}
        src={props.path}
        className=" rounded mx-auto d-block"
        alt="..."
      />
    </div>
  );
}
export default Image;
