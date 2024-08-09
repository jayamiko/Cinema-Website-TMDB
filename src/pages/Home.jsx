import React, { useEffect, useState } from "react";
import { getNowPlayingMovies, getTopRatedMovies } from "../api/movie/movieApi";
import useMovieSearch from "../hooks/useMovieSearch";
import MovieContainer from "../containers/MovieContainer";
import MovieScrollContainer from "../containers/MovieScrollContainer";

function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentMovieIsLoading, setCurrentMovieIsLoading] = useState(true);
  const [currentMovieIsError, setCurrentMovieIsError] = useState("");

  const [topMovies, setTopMovies] = useState([]);
  const [topMovieIsLoading, setTopMovieIsLoading] = useState(true);
  const [topMovieIsError, setTopMovieIsError] = useState("");

  const [query, setQuery] = useState("");

  const resultMovie = useMovieSearch(topMovies, query);

  useEffect(() => {
    getNowPlayingMovies(
      setCurrentMovies,
      setCurrentMovieIsLoading,
      setCurrentMovieIsError
    );
    getTopRatedMovies(setTopMovies, setTopMovieIsLoading, setTopMovieIsError);
  }, []);

  return (
    <section className="container mx-auto my-10 px-5">
      {/* Now Playing Section */}
      <MovieScrollContainer
        title="Now Playing"
        movies={currentMovies}
        isLoading={currentMovieIsLoading}
        isError={currentMovieIsError}
      />

      <br />

      {/* Top Rated Section */}
      <MovieContainer
        title="Top Rated"
        movies={resultMovie}
        setQuery={setQuery}
        showWatchlist={false}
        showFavorite={false}
        isLoading={topMovieIsLoading}
        isError={topMovieIsError}
      />
    </section>
  );
}

export default Home;
