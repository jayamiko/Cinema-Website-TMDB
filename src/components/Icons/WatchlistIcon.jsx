import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function WatchlistIcon(props) {
  return (
    <>
      {props.fill ? (
        <FaBookmark
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => props.setFill(false)}
        />
      ) : (
        <FaRegBookmark
          size={props.size}
          style={{ cursor: "pointer" }}
          onClick={() => props.setFill(true)}
        />
      )}
    </>
  );
}

export default WatchlistIcon;
