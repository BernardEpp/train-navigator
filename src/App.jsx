import { Component, useState } from 'react';
import './App.css';
import TrainConnection from './components/TrainConnection';


function App() {
  const [connections, setConnections] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");


  const searchConnection = async (start, end) => {
    console.log('search for start: ' + start + 'and end: ' + end);
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({start, end}) // start=Stuttgart&end=Kassel
    );
    const data = await response.json();
    setConnections('Start' + start + 'End' + end);
  };

  return (
    <main>
      <h1>Train Navigator</h1>
      <input type="text" placeholder='Start' onChange={(e) => setStart(e.target.value)} />
      <input type="text" placeholder='End' onChange={(e) => setEnd(e.target.value)}/>
      <button onClick={() => searchConnection(start, end)}>Search</button>

      <ul>
        {connections}
        {/* {connections.map((cities) => (
          <TrainConnection cities={cities}></TrainConnection>
        ))} */}

        {connections.length === 0 && 'No connections found.'}
      </ul>
    </main>
  );
};

export default App
