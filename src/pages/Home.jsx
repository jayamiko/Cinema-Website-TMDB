import React, { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import {
  getNowPlayingMovies,
  getSearchMovies,
  getTopRatedMovies,
} from "../api/movie/movieApi";
import SearchBar from "../components/Inputs/SearchBar";

function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentMovieIsLoading, setCurrentMovieIsLoading] = useState(true);

  const [topMovies, setTopMovies] = useState([]);
  const [topMovieIsLoading, setTopMovieIsLoading] = useState(true);

  const [query, setQuery] = useState("");

  useEffect(() => {
    getNowPlayingMovies(setCurrentMovies, setCurrentMovieIsLoading);
  }, []);

  useEffect(() => {
    if (query) {
      getSearchMovies(query, setTopMovies, setTopMovieIsLoading);
    } else {
      getTopRatedMovies(setTopMovies, setTopMovieIsLoading);
    }
  }, [query]);

  console.log(query);
  console.log(topMovies);

  return (
    <section className="container mx-auto my-10 px-5">
      <section id="now-playing">
        <Typography>Now Playing</Typography>
        {!currentMovieIsLoading && (
          <div className="overflow-x-auto whitespace-nowrap py-5">
            {currentMovies?.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  item={movie}
                  showWatchlist={true}
                  showFavorite={true}
                />
              );
            })}
          </div>
        )}
      </section>
      <br />
      <section id="top-rated">
        <Typography>Top Rated</Typography>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
          {!topMovieIsLoading &&
            topMovies?.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  item={movie}
                  showWatchlist={false}
                  showFavorite={false}
                />
              );
            })}
        </div>
      </section>
    </section>
  );
}

export default Home;
