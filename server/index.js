import express from "express";
import cors from 'cors'; // Cross origin ressource sharing CORS, enables the frontend to make requests from a different url.

// Init express app
const app = express();
app.use(cors());
app.use(express.json());


// HTTP Endpoint 
app.get('', (req, res) => {

    const start = req.query.start?.toLowerCase() || '';
    const dest = req.query.dest?.toLowerCase() || '';

    // TODO: Business Logic
    const results = start + dest;

    res.send(results);
});


app.listen(8080, () => console.log('Listening on port http://localhost:8080'));