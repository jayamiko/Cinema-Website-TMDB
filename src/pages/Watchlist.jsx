import React, { useEffect, useState } from "react";
import checkSessionId from "../helpers/getSessionId";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/Modals/ModalLogin";

function Watchlist() {
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!checkSessionId()) {
      setShowModal(true);
    }
  }, [navigate, checkSessionId()]);

  return (
    <div>
      Watchlist
      <ModalLogin
        showModal={showModal}
        setShowModal={setShowModal}
        setSessionId={setSessionId}
      />
    </div>
  );
}

export default Watchlist;
