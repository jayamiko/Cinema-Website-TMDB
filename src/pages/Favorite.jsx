import React, { useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import useMovieData from "../hooks/useMovieData";
import { useLocalStorage } from "../utils/localStorage.";
import useMovieSearch from "../hooks/useMovieSearch";
import MovieContainer from "../containers/MovieContainer";

function Favorite() {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const { sessionId } = useLocalStorage();
  const { favorites } = useMovieData();
  const resultMovie = useMovieSearch(favorites, query);

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
            title="Your Favorite Movie"
            movies={resultMovie}
            setQuery={setQuery}
            showWatchlist={false}
          />
        </div>
      )}
      <ModalLogin showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export default Favorite;
