import React from "react";

function ErrorNotification({ message, textColor = "white" }) {
  if (!message) return null;

  return (
    <div className="w-full text-center font-bold">
      <span style={{ color: textColor }}>{message}</span>
    </div>
  );
}

export default ErrorNotification;
