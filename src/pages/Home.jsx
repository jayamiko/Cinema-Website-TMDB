import React, { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import { getNowPlayingMovies, getTopRatedMovies } from "../api/movie/movieApi";

function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentMovieIsLoading, setCurrentMovieIsLoading] = useState(true);

  const [topMovies, setTopMovies] = useState([]);
  const [topMovieIsLoading, settopMovieIsLoading] = useState(true);

  useEffect(() => {
    getNowPlayingMovies(setCurrentMovies, setCurrentMovieIsLoading);
    getTopRatedMovies(setTopMovies, settopMovieIsLoading);
  }, []);

  return (
    <section className="container mx-auto my-10 px-5">
      {!currentMovieIsLoading && (
        <>
          <Typography>Now Playing</Typography>
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
        </>
      )}
      <br />
      {!topMovieIsLoading && (
        <>
          <Typography>Top Rated</Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
            {topMovies?.map((movie, index) => {
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
        </>
      )}
    </section>
  );
}

export default Home;
