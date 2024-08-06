import React from "react";

function Button(props) {
  return (
    <button className={props.styles} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
