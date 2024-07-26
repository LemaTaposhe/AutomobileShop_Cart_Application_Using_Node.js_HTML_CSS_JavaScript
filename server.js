// Require necessary modules
const express = require("express");
const path = require("path");

// Create Express app
const app = express();

// Set up static file serving
app.use(express.static(path.join(__dirname, "Public")));

// Define routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public/index.html"));
});

// Set up server to listen on port 1234
const port = 1234;
app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});
