import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function WatchlistIcon(props) {
  const handleClick = (value) => {
    if (props.setFill) {
      props.setFill(value);
    }
  };
  return (
    <>
      {props.fill ? (
        <FaBookmark
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(false)}
        />
      ) : (
        <FaRegBookmark
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(true)}
        />
      )}
    </>
  );
}

export default WatchlistIcon;
