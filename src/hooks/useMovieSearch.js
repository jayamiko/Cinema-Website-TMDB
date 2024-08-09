import { useState, useEffect } from "react";
import removeUnderscore from "../utils/removeUnderscore";

const useMovieSearch = (data, query) => {
  const [resultMovie, setResultMovie] = useState([]);

  useEffect(() => {
    const resultSearch = data.filter((item) => {
      if (query === "") {
        return true;
      }

      const title = removeUnderscore(item.title).toLowerCase();
      return title.includes(query.toLowerCase());
    });

    setResultMovie(resultSearch);
  }, [query, data]);

  return resultMovie;
};

export default useMovieSearch;
