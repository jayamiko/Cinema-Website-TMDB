import React, { useState } from "react";
import Image from "../Images/Image";
import WatchlistIcon from "../Icons/WatchlistIcon";
import HeartIcon from "../Icons/HeartIcon";
import { IMAGE_URL } from "../../api";

function MovieCard({ item }) {
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="inline-block w-fit max-w-48 bg-slate-900 rounded-xl overflow-hidden m-2">
      <div className="relative">
        <div className="absolute h-full w-full flex justify-end items-end p-4 space-x-2">
          <WatchlistIcon
            fill={isWatchlist}
            setFill={setIsWatchlist}
            size={22}
          />
          <HeartIcon fill={isFavorite} setFill={setIsFavorite} size={22} />
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
