import React, { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import {
  getNowPlayingMovies,
  getSearchMovies,
  getTopRatedMovies,
} from "../api/movie/movieApi";
import SearchBar from "../components/Inputs/SearchBar";
import ErrorNotification from "../components/Notifications/ErrorNotification";
import EmptyMovie from "../components/Notifications/EmptyMovie";

function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentMovieIsLoading, setCurrentMovieIsLoading] = useState(true);
  const [currentMovieIsError, setCurrentMovieIsError] = useState("");

  const [topMovies, setTopMovies] = useState([]);
  const [topMovieIsLoading, setTopMovieIsLoading] = useState(true);
  const [topMovieIsError, setTopMovieIsError] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    getNowPlayingMovies(
      setCurrentMovies,
      setCurrentMovieIsLoading,
      setCurrentMovieIsError
    );
  }, []);

  useEffect(() => {
    if (query) {
      getSearchMovies(
        query,
        setTopMovies,
        setTopMovieIsLoading,
        setTopMovieIsError
      );
    } else {
      getTopRatedMovies(setTopMovies, setTopMovieIsLoading, setTopMovieIsError);
    }
  }, [query]);

  return (
    <section className="container mx-auto my-10 px-5">
      {/* Now Playing Section */}
      <section id="now-playing">
        <Typography>Now Playing</Typography>
        <div className="overflow-x-auto whitespace-nowrap py-5">
          {currentMovies?.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                item={movie}
                showWatchlist={true}
                showFavorite={true}
                isLoading={currentMovieIsLoading}
              />
            );
          })}
        </div>

        {/* If now playing error */}
        <ErrorNotification message={currentMovieIsError} />
      </section>

      <br />

      {/* Top Rated Section */}
      <section id="top-rated" className="min-h-screen">
        <Typography>Top Rated</Typography>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
          {topMovies?.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                item={movie}
                showWatchlist={false}
                showFavorite={false}
                isLoading={topMovieIsLoading}
              />
            );
          })}
        </div>

        {/* If empty data */}
        <EmptyMovie data={topMovies} message="Movie not in search!" />
        {/* If top rated error */}
        <ErrorNotification message={topMovieIsError} />
      </section>
    </section>
  );
}

export default Home;
