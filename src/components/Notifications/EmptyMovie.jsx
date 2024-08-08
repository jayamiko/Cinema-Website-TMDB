import React from "react";

function EmptyMovie(props) {
  return (
    <div className="w-full text-center">
      {props.data?.length === 0 && (
        <p className="text-white italic text-xl">{props.message}</p>
      )}
    </div>
  );
}

export default EmptyMovie;
