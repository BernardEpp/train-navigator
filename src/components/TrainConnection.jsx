import React from "react";

const TrainConnection = ({ cities }) => {
  return (
    // <div>
    //   <div>Hello</div>
    //   <div>{JSON.stringify(cities)}</div>
    // </div>
    <li className="TrainConnection">
      {cities.map((city, index) => (
        <div key={index}>{city}</div>
      ))}
    </li>
  );
};

export default TrainConnection;
