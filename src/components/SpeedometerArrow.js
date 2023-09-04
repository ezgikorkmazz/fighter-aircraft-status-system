import React, { useState, useEffect } from "react";

const SpeedometerArrow = ({ speed }) => {
  const [rotation, setRotation] = useState(210);

  useEffect(() => {
    const calculateRotation = () => {
      const minAngle = 210;
      const maxAngle = 510;
      const range = maxAngle - minAngle;
      return minAngle + (speed / 100) * range;
    };

    const targetRotation = calculateRotation();

    const diff = targetRotation - rotation;
    let newRotation = rotation + diff;

    if (newRotation < 210) {
      newRotation = 210;
    } else if (newRotation > 510) {
      newRotation = 510;
    }

    setRotation(newRotation);
  }, [speed]);

  return (
    <svg
      className="speedometer-arrow-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "50% 80%",
      }}
    >
      <polygon points="50,5 43,90 57,90" />
      <circle cx="50" cy="93" r="12" />
    </svg>
  );
};

export default SpeedometerArrow;
