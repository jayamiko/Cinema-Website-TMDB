import React, { useContext, useEffect, useState } from "react";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import getLocalStorageValue from "../helpers/getLocalStorageValue";
import { AuthContext } from "../context/AuthContextProvider";

function Watchlist() {
  const [showModal, setShowModal] = useState(false);

  const watchlist = JSON.parse(getLocalStorageValue("watchlist"));

  const { stateAuth, dispatch } = useContext(AuthContext);

  const isLogin = stateAuth.isLogin;

  useEffect(() => {
    if (!isLogin) {
      setShowModal(true);
    }
  }, [isLogin]);

  return (
    <section>
      {isLogin && (
        <div className="container mx-auto my-10">
          <Typography>Your Watchlist</Typography>
          <div className="flex flex-wrap py-5">
            {watchlist?.map((movie, index) => {
              return (
                <MovieCard key={index} item={movie} showWatchlist={true} />
              );
            })}
          </div>
        </div>
      )}
      <ModalLogin
        showModal={showModal}
        setShowModal={setShowModal}
        dispatch={dispatch}
      />
    </section>
  );
}

export default Watchlist;
