import React from "react";

const StartStopButtons = ({ onStart, onStop }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <button onClick={onStart}>Start Getting Messages</button>
      <button onClick={onStop}>Stop Getting Messages</button>
    </div>
  );
};

export default StartStopButtons;
