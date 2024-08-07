import React, { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import { getNowPlayingMovies, getTopRatedMovies } from "../api/movie/movieApi";

function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies(setCurrentMovies);
    getTopRatedMovies(setTopMovies);
  }, []);

  return (
    <section className="container mx-auto my-10">
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
      <Typography>Top Rated</Typography>
      <div className="flex flex-wrap py-5">
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
    </section>
  );
}

export default Home;
