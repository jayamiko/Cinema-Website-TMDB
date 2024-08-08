import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getRecomendationMovies } from "../api/movie/movieApi";
import { IMAGE_URL } from "../api";
import Image from "../components/Images/Image";
import formatRuntime from "../utils/formatRuntime";
import ScoreProgress from "../components/Progress/ScoreProgress";
import HeartIcon from "../components/Icons/HeartIcon";
import WatchlistIcon from "../components/Icons/WatchlistIcon";
import Button from "../components/Buttons/Button";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import {
  getLocalStorageValue,
  saveToLocalStorage,
} from "../utils/localStorage.";
import isItemInList from "../utils/isItemInList";

function CinemaDetail() {
  const { id } = useParams();

  const movieId = parseInt(id);

  const [data, setData] = useState({});
  const [recomendations, setRecomendations] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getMovieDetail(movieId, setData);
    getRecomendationMovies(movieId, setRecomendations);
  }, [movieId]);

  const releaseDate = data?.release_date;
  const genreNames = data?.genres?.map((genre) => genre?.name).join(", ");

  useEffect(() => {
    const watchlistData = JSON.parse(getLocalStorageValue("watchlist")) || [];
    const favoritesData = JSON.parse(getLocalStorageValue("favorites")) || [];
    setWatchlist(watchlistData);
    setFavorites(favoritesData);
  }, []);

  useEffect(() => {
    setIsWatchlist(isItemInList(watchlist, movieId));
    setIsFavorite(isItemInList(favorites, movieId));
  }, [movieId, watchlist, favorites]);

  return (
    <section className="min-h-screen">
      <section className="relative flex justify-center">
        <div className="absolute z-10 container mx-auto h-full flex items-center px-5 space-x-8">
          <Image
            src={IMAGE_URL + data?.poster_path}
            width={250}
            height={250}
            alt={data?.title}
            className="rounded-xl"
          />

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl xl:text-4xl">
              <b>{data?.title}</b>
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
                {formatRuntime(data?.runtime)}
              </span>
            </div>

            <div className="flex items-center space-x-4 py-2">
              <ScoreProgress score={data?.vote_average * 10} />
              <span className="text-xs w-10">User Score</span>
              <Button
                onClick={() => saveToLocalStorage("watchlist", data, movieId)}
              >
                <WatchlistIcon
                  fill={isWatchlist}
                  setFill={setIsWatchlist}
                  size={22}
                />
              </Button>
              <Button
                onClick={() => saveToLocalStorage("favorites", data, movieId)}
              >
                <HeartIcon
                  fill={isFavorite}
                  setFill={setIsFavorite}
                  size={22}
                />
              </Button>
            </div>

            <i className="text-xs lg:text-sm xl:text-base">{data?.tagline}</i>
            <h6 className="font-bold capitalize text-sm xl:text-base">
              Overview
            </h6>
            <p className="w-full text-xs lg:text-sm xl:text-base lg:w-3/4">
              {data?.overview}
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${IMAGE_URL + data.backdrop_path})`,
            height: "65vh",
          }}
          className="w-full bg-cover bg-center bg-no-repeat brightness-75"
        ></div>
      </section>
      <section className="container mx-auto my-10">
        <Typography>Recomendations</Typography>
        <div className="overflow-x-auto whitespace-nowrap py-5">
          {recomendations?.map((movie, index) => {
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
      </section>
    </section>
  );
}

export default CinemaDetail;
