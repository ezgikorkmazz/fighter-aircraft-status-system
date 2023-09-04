import React, { useState, useEffect } from "react";

const Battery = ({ battery }) => {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [blink, setBlink] = useState(false);
  const [blinkText, setBlinkText] = useState(false); // Add state for blinking text
  const [colour, setColour] = useState("green");
  const [arrayLength, setArrayLength] = useState(4);

  useEffect(() => {
    setBatteryLevel(battery);
    if (battery === 100) {
      setColour("green");
      setArrayLength(4);
    } else if (battery > 50 && battery < 75) {
      setColour("green");
      setArrayLength(3);
    } else if (battery > 25 && battery < 50) {
      setColour("yellow");
      setArrayLength(2);
    } else if (battery > 0 && battery < 25) {
      setColour("red");
      setArrayLength(1);
    } else if (battery === 0) {
      setColour("red");
      setArrayLength(0);
    }
    setBlink(battery < 20);
    setBlinkText(battery < 20);
  }, [battery]);

  return (
    <svg
      className="battery-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 471.829 471.829"
      xmlSpace="preserve"
      width="400"
      height="400"
    >
      {blink ? (
        <path d="M319.089,27.221h-36.475V0h-95.27v27.221h-34.607c-22.517,0-40.829,18.317-40.829,40.832v362.946   c0,22.51,18.317,40.83,40.829,40.83h166.352c22.524,0,40.832-18.32,40.832-40.83V68.052   C359.921,45.538,341.613,27.221,319.089,27.221z M332.705,431.002c0,7.501-6.108,13.607-13.616,13.607H152.737   c-7.501,0-13.608-6.095-13.608-13.607V68.052c0-7.501,6.107-13.611,13.608-13.611h166.352c7.508,0,13.616,6.109,13.616,13.611">
          <animate
            attributeName="visibility"
            values="hidden;visible;hidden;"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      ) : (
        <path d="M319.089,27.221h-36.475V0h-95.27v27.221h-34.607c-22.517,0-40.829,18.317-40.829,40.832v362.946   c0,22.51,18.317,40.83,40.829,40.83h166.352c22.524,0,40.832-18.32,40.832-40.83V68.052   C359.921,45.538,341.613,27.221,319.089,27.221z M332.705,431.002c0,7.501-6.108,13.607-13.616,13.607H152.737   c-7.501,0-13.608-6.095-13.608-13.607V68.052c0-7.501,6.107-13.611,13.608-13.611h166.352c7.508,0,13.616,6.109,13.616,13.611" />
      )}
      {Array.from({ length: arrayLength }, (v, i) => i + 1).map((rect) => (
        <rect
          key={rect}
          x="155"
          y={130 + (4 - rect) * 80}
          width="163"
          height="60"
          fill={colour}
        />
      ))}
      <text
        className={blinkText ? "blinking-text" : ""}
        x="50%"
        y="20%"
        fontSize="40"
        fill="#fff"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {batteryLevel}%
      </text>
    </svg>
  );
};

export default Battery;
