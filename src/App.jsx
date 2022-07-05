import { Component, useState } from "react";
import "./App.css";
import TrainConnection from "./components/TrainConnection";

function App() {
  const [connections, setConnections] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const searchConnection = async (start, dest) => {
    console.log("search for start: " + start + " and end: " + dest);

    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ start, dest }) // start=Stuttgart&dest=Kassel
    );
    const data = await response.json();
    setConnections(data);
  };

  return (
    <main>
      <h1>Train Navigator</h1>
      <input
        type="text"
        placeholder="Start"
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="End"
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={() => searchConnection(start, end)}>Search</button>

      <ul>
        {connections.map((route, index) => (
          <TrainConnection key={index} cities={route}></TrainConnection>
        ))}

        {connections.length === 0 && "No connections found."}
      </ul>
    </main>
  );
}

export default App;
