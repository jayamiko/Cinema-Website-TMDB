import React, { useContext, useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import { getLocalStorageValue } from "../utils/localStorage.";
import useMovieData from "../hooks/useMovieData";
import EmptyMovie from "../components/Notifications/EmptyMovie";

function Watchlist() {
  const [showModal, setShowModal] = useState(false);

  const { watchlist } = useMovieData();

  const { dispatch } = useContext(AuthContext);

  const sessionId = getLocalStorageValue("session_id");

  useEffect(() => {
    if (!sessionId) {
      setShowModal(true);
    }
  }, [sessionId]);

  return (
    <section>
      {sessionId && (
        <div className="container mx-auto my-10">
          <Typography>Your Watchlist</Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
            {watchlist?.map((movie, index) => {
              return (
                <MovieCard key={index} item={movie} showWatchlist={true} />
              );
            })}
          </div>

          {/* If empty data */}
          <EmptyMovie data={watchlist} message="Watchlist Movie is empty!" />
        </div>
      )}
      <ModalLogin
        showModal={showModal}
        setShowModal={setShowModal}
        dispatch={dispatch}
      />
    </section>
  );
}

export default Watchlist;
