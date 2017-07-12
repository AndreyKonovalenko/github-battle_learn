const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;


// Serve static assets
app.use(express.static(path.resolve(__dirname, 'dist')));

//Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

//make our app listen fo incoming requests on the port assigned aboves
app.listen(port, () => {
    console.log(`SERVER RUNNING ... PORT: ${port}`);
});