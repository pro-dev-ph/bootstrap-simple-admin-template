const express = require('express');
const path = require('path');
const { getUserByUsernameAndPassword } = require('./database.js'); // Assuming your database functions are in a file named database.js
const { doesUserExist } = require('./database.js'); // Assuming your database functions are in a file named database.js

const app = express();
const PORT = process.env.PORT || 3300;

// Define the directory where static files are located
const staticDir = path.join(__dirname, '/'); // Assuming login.html is in the NewGroupB directory

// Serve static files
app.use(express.static(staticDir));

// Define route to serve the login.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(staticDir, 'login.html')); // Sends login.html when the root URL is accessed
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login.html`);
});

const username = 'samimose';
const password = '34243';

getUserByUsernameAndPassword(username, password)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error);
    });