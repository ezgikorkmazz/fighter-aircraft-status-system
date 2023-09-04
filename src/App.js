import React, { useState, useEffect } from "react";
import "./App.css";
import Plane from "./components/Plane";
import SpeedometerArrow from "./components/SpeedometerArrow";
import SpeedometerCircle from "./components/SpeedometerCircle";
import Battery from "./components/Battery";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5175");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.eventName === "PLANE_ANGLE") {
        setAngle(data.data.angle);
      } else if (data.eventName === "PLANE_SPEED") {
        setSpeed(parseFloat(data.data.speed));
      } else if (data.eventName === "PLANE_BATTERY") {
        setBattery(data.data.battery);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleStart = () => {
    if (socket) {
      socket.send("START");
    }
  };

  const handleStop = () => {
    if (socket) {
      socket.send("STOP");
    }
  };

  return (
    <div className="container">
      <Battery battery={battery} className="battery-class" />
      <div className="fighter-aircraft-status">
        <div className="left-side">
          <Plane angle={angle} />
        </div>

        <div className="right-side">
          <SpeedometerCircle speed={speed} />
          <SpeedometerArrow speed={speed} />
          <div className="speed-text">
            {speed.toFixed(2)}
            <br /> KM/H
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="start-button" onClick={handleStart}>
          Start Getting Messages
        </button>
        <button className="stop-button" onClick={handleStop}>
          Stop Getting Messages
        </button>
      </div>
    </div>
  );
};

export default App;
