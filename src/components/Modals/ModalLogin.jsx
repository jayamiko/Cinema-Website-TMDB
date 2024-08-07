import React from "react";
import api from "../../api";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import getRequestToken from "../../api/requestToken/requestToken";

function ModalLogin({ showModal, setShowModal, setSessionId }) {
  const handleLogin = async () => {
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

      const sessionId = sessionResponse.data.session_id;
      setSessionId(sessionId);
      localStorage.setItem("session_id", sessionId);
      setShowModal(false);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-2 w-40 h-40 rounded-2xl shadow-lg relative flex flex-col items-center justify-center bg-white outline-none focus:outline-none">
                <Image
                  src="/tmdb-logo.png"
                  width={100}
                  height={100}
                  alt="TMDB Logo"
                />
                <Button
                  styles="text-black hover:underline mt-2 text-x"
                  onClick={handleLogin}
                >
                  Login with TMDB
                </Button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default ModalLogin;
