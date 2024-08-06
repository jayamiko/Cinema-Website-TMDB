function checkSessionId() {
  const sessionId = localStorage.getItem("session_id");
  return sessionId !== null;
}

export default checkSessionId;
