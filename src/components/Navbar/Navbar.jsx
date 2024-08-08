import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Paths from "../../constants/Page";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import api, { API_KEY } from "../../api";
import { STATE } from "../../constants/State";
import { AuthContext } from "../../context/AuthContextProvider";

function Navbar() {
  const { stateAuth, dispatch } = useContext(AuthContext);

  const sessionId = stateAuth.session_id;

  const handleLogout = async () => {
    try {
      await api.delete(`/authentication/session`, {
        data: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });
      dispatch({ type: STATE.LOGOUT });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-primary w-full h-28 flex items-center sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="uppercase xl:text-5xl tracking-widest">
          <Link to={Paths.HOME}>Cinema</Link>
        </h2>

        <ul className="flex items-center space-x-10">
          <li className="navbar-list">
            <Link to={Paths.WATCHLIST}>Watchlist</Link>
          </li>
          <li className="navbar-list">
            <Link to={Paths.FAVORITE}>Favorite</Link>
          </li>
          {sessionId && (
            <li className="navbar-list">
              <Button onClick={handleLogout}>
                <Image
                  src="/logout-icon.png"
                  width={25}
                  height={25}
                  alt="Logout"
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
