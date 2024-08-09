import React, { useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import useMovieData from "../hooks/useMovieData";
import useMovieSearch from "../hooks/useMovieSearch";
import { useLocalStorage } from "../utils/localStorage.";
import MovieContainer from "../containers/MovieContainer";

function Watchlist() {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const { sessionId } = useLocalStorage();
  const { watchlist } = useMovieData();
  const resultMovie = useMovieSearch(watchlist, query);

  useEffect(() => {
    if (!sessionId) {
      setShowModal(true);
    }
  }, [sessionId]);

  return (
    <section>
      {sessionId && (
        <div className="container mx-auto px-5 my-10">
          <MovieContainer
            title="Your Watchlist"
            movies={resultMovie}
            setQuery={setQuery}
            showFavorite={false}
          />
        </div>
      )}

      <ModalLogin showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export default Watchlist;
