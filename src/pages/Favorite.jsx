import React, { useContext, useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import useMovieData from "../hooks/useMovieData";
import { useLocalStorage } from "../utils/localStorage.";
import EmptyMovie from "../components/Notifications/EmptyMovie";

function Favorite() {
  const [showModal, setShowModal] = useState(false);

  const { sessionId } = useLocalStorage();
  const { favorites } = useMovieData();

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!sessionId) {
      setShowModal(true);
    }
  }, [sessionId]);

  return (
    <section>
      {sessionId && (
        <div className="container mx-auto my-10">
          <Typography>Your Favorite Movie</Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
            {favorites?.map((movie, index) => {
              return <MovieCard key={index} item={movie} showFavorite={true} />;
            })}
          </div>

          {/* If empty data */}
          <EmptyMovie data={favorites} message="Favorite Movie is empty!" />
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

export default Favorite;
