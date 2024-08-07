import React, { useEffect, useState } from "react";
import Image from "../Images/Image";
import WatchlistIcon from "../Icons/WatchlistIcon";
import HeartIcon from "../Icons/HeartIcon";
import { IMAGE_URL } from "../../api";
import Button from "../Buttons/Button";
import getLocalStorageValue from "../../helpers/getLocalStorageValue";
import { Link } from "react-router-dom";

function MovieCard({ item, showWatchlist, showFavorite }) {
  const movieId = item.id;

  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const watchlistData = JSON.parse(getLocalStorageValue("watchlist")) || [];
    const favoritesData = JSON.parse(getLocalStorageValue("favorites")) || [];
    setWatchlist(watchlistData);
    setFavorites(favoritesData);
  }, []);

  useEffect(() => {
    function isItemInList(data) {
      return data?.map((list) => list.id).includes(movieId);
    }

    setIsWatchlist(isItemInList(watchlist));
    setIsFavorite(isItemInList(favorites));
  }, [movieId, watchlist, favorites]);

  function saveToLocalStorage(key, value) {
    let data = getLocalStorageValue(key);

    data = data ? JSON.parse(data) : [];

    const itemIndex = data.findIndex((list) => list.id === movieId);

    if (itemIndex !== -1) {
      data.splice(itemIndex, 1);
    } else {
      data.push(value);
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <div className="inline-block w-fit max-w-48 bg-slate-900 rounded-xl overflow-hidden m-2">
      <div className="relative flex items-end justify-end">
        <div className="absolute h-fit w-fit space-x-2 m-3">
          {showWatchlist && (
            <Button onClick={() => saveToLocalStorage("watchlist", item)}>
              <WatchlistIcon
                fill={isWatchlist}
                setFill={setIsWatchlist}
                size={22}
              />
            </Button>
          )}
          {showFavorite && (
            <Button onClick={() => saveToLocalStorage("favorites", item)}>
              <HeartIcon fill={isFavorite} setFill={setIsFavorite} size={22} />
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
    </div>
  );
}

export default MovieCard;
