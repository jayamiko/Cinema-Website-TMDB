import React from "react";

function Typography(props) {
  return (
    <h1 className="text-white font-bold capitalize xl:text-3xl">
      {props.children}
    </h1>
  );
}

export default Typography;
