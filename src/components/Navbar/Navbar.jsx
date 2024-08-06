import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paths from "../../constants/Page";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import api, { API_KEY } from "../../api";
import getLocalStorageValue from "../../helpers/getLocalStorageValue";

function Navbar() {
  const [sessionId, setSessionId] = useState("");

  const keySessionId = "session_id";

  const session = getLocalStorageValue(keySessionId);
  useEffect(() => {
    setSessionId(session);
  }, [session]);

  const handleLogout = async () => {
    try {
      await api.delete(`/authentication/session`, {
        data: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });
      localStorage.removeItem("session_id");
      setSessionId(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-primary w-full h-28 flex items-center sticky top-0">
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
