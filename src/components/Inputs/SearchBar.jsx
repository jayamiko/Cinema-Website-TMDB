import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-white bg-slate-700 px-4 rounded-md w-44 sm:w-60 xl:w-72 h-8 xl:h-10 my-2 text-xs sm:text-sm lg:text-base"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search your movie.."
    />
  );
}

export default SearchBar;
