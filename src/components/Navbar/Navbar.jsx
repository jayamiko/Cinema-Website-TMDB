import React from "react";
import { Link } from "react-router-dom";
import Paths from "../../constants/Page";

function Navbar() {
  return (
    <nav className="bg-primary w-full h-28 flex items-center sticky top-0">
      <div className="container mx-auto text-white font-bold flex justify-between items-center">
        <h2 className="uppercase xl:text-5xl tracking-widest">
          <Link to={Paths.HOME}>Cinema</Link>
        </h2>

        <ul className="flex items-center space-x-10">
          <li className="xl:text-xl">
            <Link to={Paths.WATCHLIST}>Watchlist</Link>
          </li>
          <li className="xl:text-xl">
            <Link to={Paths.FAVORITE}>Favorite</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
