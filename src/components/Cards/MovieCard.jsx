import React, { useState } from "react";
import Image from "../Images/Image";
import WatchlistIcon from "../Icons/WatchlistIcon";
import HeartIcon from "../Icons/HeartIcon";
import { IMAGE_URL } from "../../api";
import Button from "../Buttons/Button";
import getLocalStorageValue from "../../helpers/getLocalStorageValue";

function MovieCard({ item, showWatchlist, showFavorite }) {
  const { id } = item;

  const watchlist = JSON.parse(getLocalStorageValue("watchlist"));
  const favorites = JSON.parse(getLocalStorageValue("favorites"));

  function isItemInList(data) {
    return data?.map((list) => list.id).includes(id);
  }

  const [isWatchlist, setIsWatchlist] = useState(isItemInList(watchlist));
  const [isFavorite, setIsFavorite] = useState(isItemInList(favorites));

  function saveToLocalStorage(key, value) {
    let data = getLocalStorageValue(key);

    data = data ? JSON.parse(data) : [];

    const itemIndex = data.findIndex((list) => list.id === id);

    if (itemIndex !== -1) {
      data.splice(itemIndex, 1);
    } else {
      data.push(value);
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <div className="inline-block w-fit max-w-48 bg-slate-900 rounded-xl overflow-hidden m-2">
      <div className="relative">
        <div className="absolute h-full w-full flex justify-end items-end p-4 space-x-2">
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
        <Image
          src={IMAGE_URL + item?.poster_path}
          width={200}
          height={200}
          alt={item?.title}
        />
      </div>
      <div className="p-3">
        <h4 className="font-extrabold line-clamp-1 text-wrap">{item?.title}</h4>

        <span className="text-sm font-extralight">
          {item?.release_date.substring(0, 4)}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
