import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

function HeartIcon(props) {
  return (
    <>
      {props.fill ? (
        <FaHeart
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => props.setFill(false)}
        />
      ) : (
        <FiHeart
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => props.setFill(true)}
        />
      )}
    </>
  );
}

export default HeartIcon;
