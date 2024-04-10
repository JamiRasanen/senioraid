const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data storage
let dataStore = [];

// POST route to receive data
app.post('/data', (req, res) => {
    const data = req.body; // Access data sent in the request body
    dataStore = data;
    console.log('Received data:', data);
    res.send('Data received successfully');
});

// GET endpoint to retrieve stored data
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Define a route with a dynamic parameter
app.get('/user/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}!`);
});

// Start the server
const PORT = process.env.PORT || 4000; // Use the PORT environment variable if available, otherwise use port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
