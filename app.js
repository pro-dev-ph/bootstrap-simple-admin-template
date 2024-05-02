// Importing libraries
const express = require('express');
const path = require('path');
const { getUser, addUser } = require('./database.js')

const app = express();

// whats going on here
const PORT = process.env.PORT || 3300;
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded({extended: false}));

app.post("/register", async (req, res) => {
       const username = req.body.username;
       const password = req.body.password;

       getUser(username, password)
        .then(existingUser => {
            if (existingUser === undefined ) {
                addUser(username, password)
                    .then(newUser => {
                        if (newUser === 1){
                            console.log("User created");
                            res.redirect("/login");
                        }
                        else {
                            console.error("Failed to create user");
                            res.redirect("/register-error");
                        }
                    })
            }
            else {
                console.log("User already exists");
                res.redirect("/register-error");
            }
        })
})

app.post("/login", async (req, res) => {
       const username = req.body.username;
       const password = req.body.password;

       getUser(username, password)
        .then(existingUser => {
            if (existingUser === undefined ) {
                console.log("Incorrect credentials. Try again.");
                res.redirect("/login-error");
            }
            else {
                console.log("Successfully logged in!");
                res.redirect("/home"); // or index
            }
        })
})

// Routes
app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/login-error', (req, res) => {
    res.render("login-error.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})

app.get('/register-error', (req, res) => {
    res.render("register-error.ejs")
})

app.get('/home', (req, res) => {
    res.render("home.ejs")
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});