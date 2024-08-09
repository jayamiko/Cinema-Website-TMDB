import { useState, useEffect } from "react";
import { useLocalStorage } from "../utils/localStorage.";

const useMovieData = () => {
  const [data, setData] = useState({
    watchlist: [],
    favorites: [],
  });

  const { watchlist, favorites } = useLocalStorage();

  useEffect(() => {
    setData({ watchlist, favorites });

    const interval = setInterval(() => {
      setData({ watchlist, favorites });
    }, 120000);

    return () => clearInterval(interval);
  }, [watchlist, favorites]);

  return data;
};

export default useMovieData;
