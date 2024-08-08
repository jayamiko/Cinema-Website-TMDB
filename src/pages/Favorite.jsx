import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/Modals/ModalLogin";
import Typography from "../components/Typography/Typography";
import MovieCard from "../components/Cards/MovieCard";
import getLocalStorageValue from "../helpers/getLocalStorageValue";
import { AuthContext } from "../context/AuthContextProvider";

function Favorite() {
  const navigate = useNavigate();

  const session = getLocalStorageValue("session_id");
  const [showModal, setShowModal] = useState(false);

  const favorites = JSON.parse(getLocalStorageValue("favorites"));

  const { stateAuth, dispatch } = useContext(AuthContext);

  const isLogin = stateAuth.session_id;

  useEffect(() => {
    if (!isLogin) {
      setShowModal(true);
    }
  }, [isLogin]);

  return (
    <section>
      {isLogin && (
        <div className="container mx-auto my-10">
          <Typography>Your Favorite Movie</Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-5">
            {favorites?.map((movie, index) => {
              return <MovieCard key={index} item={movie} showFavorite={true} />;
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

export default Favorite;
