import React from "react";
import { useParams } from "react-router-dom";

function CinemaDetail() {
  const { name } = useParams();

  return <div>CinemaDetail {name}</div>;
}

export default CinemaDetail;
