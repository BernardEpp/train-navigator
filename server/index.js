import express from "express";
import cors from "cors"; // Cross origin resource sharing (CORS), enables the frontend to make requests from a different url.
import { searchConnection } from "./navigator.js";

// Init express app
const app = express();
app.use(cors());
app.use(express.json());

// HTTP Endpoint
app.get("", (req, res) => {
  const start = req.query.start || "";
  const dest = req.query.dest || "";

  // TODO: Business Logic
  const results = searchConnection(start, dest); //start + dest;

  res.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
