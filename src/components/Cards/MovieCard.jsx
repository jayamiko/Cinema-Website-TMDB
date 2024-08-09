import React, { useEffect, useState } from "react";
import Image from "../Images/Image";
import WatchlistIcon from "../Icons/WatchlistIcon";
import HeartIcon from "../Icons/HeartIcon";
import { IMAGE_URL } from "../../api";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { saveToLocalStorage } from "../../utils/localStorage.";
import isItemInList from "../../utils/isItemInList";
import useMovieData from "../../hooks/useMovieData";
import Skeleton from "../Skeleton/Skeleton";

function MovieCard({
  item,
  showWatchlist = true,
  showFavorite = true,
  isLoading,
}) {
  const movieId = item.id;

  const { watchlist, favorites } = useMovieData();

  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsWatchlist(isItemInList(watchlist, movieId));
    setIsFavorite(isItemInList(favorites, movieId));
  }, [movieId, watchlist, favorites]);

  return (
    <div className="inline-block w-fit max-w-48 min-h-72 bg-slate-900 rounded-xl overflow-hidden m-2">
      {!isLoading ? (
        <>
          <div className="relative flex items-end justify-end">
            <div className="absolute h-fit w-fit space-x-2 m-3">
              {showWatchlist && (
                <Button
                  onClick={() => saveToLocalStorage("watchlist", item, movieId)}
                >
                  <WatchlistIcon
                    fill={isWatchlist}
                    setFill={setIsWatchlist}
                    size={22}
                  />
                </Button>
              )}
              {showFavorite && (
                <Button
                  onClick={() => saveToLocalStorage("favorites", item, movieId)}
                >
                  <HeartIcon
                    fill={isFavorite}
                    setFill={setIsFavorite}
                    size={22}
                  />
                </Button>
              )}
            </div>
            <Link to={`/cinema/${movieId}`}>
              <Image
                src={IMAGE_URL + item?.poster_path}
                width={200}
                height={200}
                alt={item?.title}
              />
            </Link>
          </div>
          <Link to={`/cinema/${movieId}`}>
            <div className="p-3">
              <h4 className="font-extrabold line-clamp-1 text-wrap hover:text-orange-500 hover:underline">
                {item?.title}
              </h4>

              <span className="text-sm font-extralight">
                {item?.release_date.substring(0, 4)}
              </span>
            </div>
          </Link>
        </>
      ) : (
        <Skeleton styles="w-48 min-h-80" />
      )}
    </div>
  );
}

export default MovieCard;
