import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import getLocalStorageValue from "../helpers/getLocalStorageValue";

function Watchlist() {
  const navigate = useNavigate();

  const session = getLocalStorageValue("session_id");
  const watchlist = JSON.parse(getLocalStorageValue("watchlist"));

  const [sessionId, setSessionId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!session) {
      setShowModal(true);
    }
  }, [navigate, session]);

  return (
    <section>
      {session && (
        <div className="container mx-auto my-10">
          <Typography>Your Watchlist</Typography>
          <div className="flex flex-wrap py-5">
            {watchlist?.map((movie, index) => {
              return (
                <MovieCard key={index} item={movie} showWatchlist={true} />
              );
            })}
          </div>
        </div>
      )}
      <ModalLogin
        showModal={showModal}
        setShowModal={setShowModal}
        setSessionId={setSessionId}
      />
    </section>
  );
}

export default Watchlist;
