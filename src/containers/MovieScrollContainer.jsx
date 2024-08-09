import React from "react";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import ErrorNotification from "../components/Notifications/ErrorNotification";

function MovieScrollContainer(props) {
  return (
    <section>
      <Typography>{props.title}</Typography>
      <div className="overflow-x-auto whitespace-nowrap py-5">
        {props.movies?.map((movie, index) => {
          return (
            <MovieCard key={index} item={movie} isLoading={props.isLoading} />
          );
        })}
      </div>

      {/* If now playing error */}
      <ErrorNotification message={props.isError} />
    </section>
  );
}

export default MovieScrollContainer;
