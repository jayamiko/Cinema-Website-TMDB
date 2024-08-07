import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

function HeartIcon(props) {
  const handleClick = (value) => {
    if (props.setFill) {
      props.setFill(value);
    }
  };

  return (
    <>
      {props.fill ? (
        <FaHeart
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(false)}
        />
      ) : (
        <FiHeart
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(true)}
        />
      )}
    </>
  );
}

export default HeartIcon;
