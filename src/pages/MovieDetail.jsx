import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  getRatedMovies,
  getRecomendationMovies,
} from "../api/movie/movieApi";
import { IMAGE_URL } from "../api";
import Image from "../components/Images/Image";
import formatRuntime from "../utils/formatRuntime";
import ScoreProgress from "../components/Progress/ScoreProgress";
import HeartIcon from "../components/Icons/HeartIcon";
import WatchlistIcon from "../components/Icons/WatchlistIcon";
import Button from "../components/Buttons/Button";
import { saveToLocalStorage, useLocalStorage } from "../utils/localStorage.";
import isItemInList from "../utils/isItemInList";
import useMovieData from "../hooks/useMovieData";
import ModalRating from "../components/Modals/ModalRating";
import MovieScrollContainer from "../containers/MovieScrollContainer";

function MovieDetail() {
  const { id } = useParams();

  const movieId = parseInt(id);

  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { sessionId } = useLocalStorage();
  const { watchlist, favorites } = useMovieData();

  const [recomendations, setRecomendations] = useState([]);
  const [recomendationisLoading, setRecomendationIsLoading] = useState(true);
  const [recomendationisError, setRecomendationIsError] = useState("");

  const [ratedMovie, setRatedMovie] = useState();
  const [ratedMovieIsLoading, setRatedMovieIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getRatedMovies(sessionId, setRatedMovie, setRatedMovieIsLoading);
  }, [sessionId]);

  useEffect(() => {
    getMovieDetail(movieId, setMovieDetail, setIsLoading);
    getRecomendationMovies(
      movieId,
      setRecomendations,
      setRecomendationIsLoading,
      setRecomendationIsError
    );
  }, [movieId]);

  const hasReview = isItemInList(ratedMovie, movieId);
  const releaseDate = movieDetail?.release_date;
  const genreNames = movieDetail?.genres
    ?.map((genre) => genre?.name)
    .join(", ");

  useEffect(() => {
    setIsWatchlist(isItemInList(watchlist, movieId));
    setIsFavorite(isItemInList(favorites, movieId));
  }, [movieId, watchlist, favorites]);

  return (
    <section className="min-h-screen">
      {/* Movie Detail Information */}
      {!isLoading && (
        <section className="relative flex justify-center">
          <div className="absolute z-10 container mx-auto h-full flex flex-col lg:flex-row items-center p-5 lg:space-x-8">
            <div className="w-32 md:w-40 lg:w-80 h-fit flex items-center mb-2 lg:mb-0">
              <Image
                src={IMAGE_URL + movieDetail?.poster_path}
                alt={movieDetail?.title}
                className="bg-cover rounded-xl"
              />
            </div>

            <div className="space-y-1 lg:space-y-2">
              <h1 className="text-2xl md:text-3xl xl:text-4xl">
                <b>{movieDetail?.title}</b>
                <span>({releaseDate?.substring(0, 4)})</span>
              </h1>

              <div className="flex space-x-2 sm:space-x-4">
                <span className="text-xs sm:text-sm xl:text-base">
                  {releaseDate}
                </span>
                <span className="text-xs sm:text-sm xl:text-base">
                  {genreNames}
                </span>
                <span className="text-xs sm:text-sm xl:text-base">
                  {formatRuntime(movieDetail?.runtime)}
                </span>
              </div>

              <div className="flex items-center space-x-4 py-2">
                <ScoreProgress score={movieDetail?.vote_average * 10} />
                <span className="text-xs w-10">User Score</span>
                <Button
                  onClick={() =>
                    saveToLocalStorage("watchlist", movieDetail, movieId)
                  }
                >
                  <WatchlistIcon
                    fill={isWatchlist}
                    setFill={setIsWatchlist}
                    size={22}
                  />
                </Button>
                <Button
                  onClick={() =>
                    saveToLocalStorage("favorites", movieDetail, movieId)
                  }
                >
                  <HeartIcon
                    fill={isFavorite}
                    setFill={setIsFavorite}
                    size={22}
                  />
                </Button>

                {!ratedMovieIsLoading && !hasReview && (
                  <>
                    <Button
                      styles="bg-yellow-500 py-1 px-8 rounded-md font-bold text-sm"
                      onClick={() => setShowModal(true)}
                    >
                      Review
                    </Button>
                    <ModalRating
                      sessionId={sessionId}
                      movieId={movieId}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </>
                )}
              </div>

              <i className="text-xs lg:text-sm xl:text-base">
                {movieDetail?.tagline}
              </i>
              <h6 className="font-bold capitalize text-sm xl:text-base">
                Overview
              </h6>
              <p className="w-full text-xs lg:text-sm xl:text-base lg:w-3/4">
                {movieDetail?.overview}
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${IMAGE_URL + movieDetail.backdrop_path})`,
              height: "65vh",
            }}
            className="w-full bg-cover bg-center bg-no-repeat brightness-75"
          ></div>
        </section>
      )}

      {/* Movie Recomendations */}
      <section className="container mx-auto p-5">
        <MovieScrollContainer
          title="Recomendations"
          movies={recomendations}
          isLoading={recomendationisLoading}
          isError={recomendationisError}
        />
      </section>
    </section>
  );
}

export default MovieDetail;
