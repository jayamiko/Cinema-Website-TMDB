import React, { useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import useMovieData from "../hooks/useMovieData";
import EmptyMovie from "../components/Notifications/EmptyMovie";
import SearchBar from "../components/Inputs/SearchBar";
import useMovieSearch from "../hooks/useMovieSearch";
import { useLocalStorage } from "../utils/localStorage.";

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
        <div className="container mx-auto my-10">
          <Typography>Your Watchlist</Typography>
          <SearchBar query={query} setQuery={setQuery} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
            {resultMovie?.map((movie, index) => {
              return (
                <MovieCard key={index} item={movie} showWatchlist={true} />
              );
            })}
          </div>

          {/* If empty data */}
          <EmptyMovie data={resultMovie} message="Watchlist Movie is empty!" />
        </div>
      )}
      <ModalLogin showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export default Watchlist;
