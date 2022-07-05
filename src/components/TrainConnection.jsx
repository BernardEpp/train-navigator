import React from "react";

const TrainConnection = ({ cities }) => {
  return (
    <li className="TrainConnection">
      {cities.map((city, index) => (
        <div key={index}>{city}</div>
      ))}
    </li>
  );
};

export default TrainConnection;
