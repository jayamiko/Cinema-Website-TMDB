import React, { useState } from "react";
import ModalContainer from "../../containers/ModalContainer";
import StarRating from "../Inputs/StarRating";
import Button from "../Buttons/Button";
import { addRateMovie } from "../../api/movie/movieApi";
import ErrorNotification from "../Notifications/ErrorNotification";

function ModalRating({ sessionId, movieId, showModal, setShowModal }) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function onClose() {
    setShowModal(false);
  }

  function handleSubmit() {
    addRateMovie(sessionId, movieId, rating, setIsLoading, setError);
    onClose();
  }

  return (
    <ModalContainer showModal={showModal}>
      <div className="bg-slate-100 rounded-sm w-96 h-40 flex flex-col items-center justify-evenly">
        <div className="w-full flex justify-end px-4">
          <Button styles="text-black font-bold" onClick={onClose}>
            x
          </Button>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-yellow-500 font-bold text-xl">Rate The Movie!</h2>
          <StarRating rating={rating} setRating={setRating} />
          <Button
            styles={`bg-yellow-500 mt-2 py-2 px-10 uppercase rounded-md font-bold ${
              isLoading ? "cursor-wait opacity-75" : ""
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {/* If error */}
        <ErrorNotification message={error} textColor="#000" />
      </div>
    </ModalContainer>
  );
}

export default ModalRating;
