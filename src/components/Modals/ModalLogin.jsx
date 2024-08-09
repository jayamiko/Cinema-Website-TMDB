import React, { useContext, useState } from "react";
import api from "../../api";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import getRequestToken from "../../api/requestToken/requestToken";
import { Action } from "../../constants/State";
import ModalContainer from "../../containers/ModalContainer";
import ErrorNotification from "../Notifications/ErrorNotification";
import { AuthContext } from "../../context/AuthContextProvider";

function ModalLogin({ showModal, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    setIsLoading(true);

    const username = process.env.REACT_APP_TMDB_USERNAME;
    const password = process.env.REACT_APP_TMDB_PASSWORD;

    try {
      const requestToken = await getRequestToken();

      const request = {
        username,
        password,
        request_token: requestToken,
      };

      await api.post(`/authentication/token/validate_with_login`, request);

      const sessionResponse = await api.post(
        `/authentication/session/new`,
        request
      );

      dispatch({ type: Action.LOGIN, payload: sessionResponse.data });
      setShowModal(false);
    } catch (error) {
      console.error("Login failed", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer showModal={showModal}>
      <div
        className={`${
          isLoading ? "cursor-wait" : ""
        } w-40 h-40 rounded-2xl shadow-lg relative flex flex-col items-center justify-center bg-white outline-none focus:outline-none`}
      >
        <Image
          src="/tmdb-logo.png"
          width={100}
          height={100}
          alt="TMDB Logo"
          className={isLoading ? "animate-pulse" : ""}
        />
        <Button
          styles="text-black hover:underline mt-2 text-x"
          onClick={handleLogin}
        >
          Login with TMDB
        </Button>

        {/* If error response */}
        <ErrorNotification message={error} textColor="#000" />
      </div>
    </ModalContainer>
  );
}

export default ModalLogin;
