import React from "react";

function Skeleton(props) {
  return (
    <div
      className={`animate-pulse bg-slate-300 cursor-wait ${props.styles}`}
    ></div>
  );
}

export default Skeleton;
