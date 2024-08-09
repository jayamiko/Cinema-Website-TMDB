import React from "react";
import Typography from "../components/Typography/Typography";
import SearchBar from "../components/Inputs/SearchBar";
import EmptyMovie from "../components/Notifications/EmptyMovie";
import ErrorNotification from "../components/Notifications/ErrorNotification";
import MovieCard from "../components/Cards/MovieCard";

function MovieContainer(props) {
  return (
    <section className="min-h-screen">
      <Typography>{props.title}</Typography>
      <SearchBar setQuery={props.setQuery} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
        {props.movies?.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              item={movie}
              showWatchlist={props.showWatchlist}
              showFavorite={props.showFavorite}
              isLoading={props.isLoading}
            />
          );
        })}
      </div>

      {/* If empty data when search */}
      <EmptyMovie data={props.movies} message="Movie is empty!" />
      {/* If top rated error */}
      <ErrorNotification message={props.isError} />
    </section>
  );
}

export default MovieContainer;
