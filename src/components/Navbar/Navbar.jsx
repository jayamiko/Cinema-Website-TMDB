import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Path from "../../constants/Page";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import api, { API_KEY } from "../../api";
import { AuthContext } from "../../context/AuthContextProvider";
import { useLocalStorage } from "../../utils/localStorage.";
import { Action } from "../../constants/State";

function Navbar() {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const { sessionId } = useLocalStorage();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/authentication/session`, {
        data: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });
      dispatch({ type: Action.LOGOUT });

      navigate(Path.HOME);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-primary w-full h-28 flex items-center sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-5">
        <h2 className="uppercase font-extrabold tracking-widest xl:text-5xl">
          <Link to={Path.HOME}>Cinema</Link>
        </h2>

        <ul className="flex items-center space-x-2 md:space-x-5 lg:space-x-10">
          <li className="navbar-list">
            <Link to={Path.WATCHLIST}>Watchlist</Link>
          </li>
          <li className="navbar-list">
            <Link to={Path.FAVORITE}>Favorite</Link>
          </li>
          {sessionId && (
            <li className="navbar-list">
              <Button
                styles={`${isLoading ? "cursor-wait" : "cursor-pointer"}`}
                onClick={handleLogout}
              >
                <Image
                  src="/logout-icon.png"
                  width={25}
                  height={25}
                  alt="Logout"
                  className={`${isLoading ? "opacity-50" : ""}`}
                />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
