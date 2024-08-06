import React, { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import getNowPlayingMovies from "../api/movie/movieApi";
import MovieCard from "../components/Cards/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies(setMovies);
  }, []);

  return (
    <section className="container mx-auto my-10">
      <Typography>Now Playing</Typography>
      <div className="overflow-x-auto whitespace-nowrap py-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} item={movie} />
        ))}
      </div>
    </section>
  );
}

export default Home;
