// Importing libraries
const { getUser, addUser, getUserIngredients, addIngredients } = require('./database.js')
const express = require('express');
const session = require('express-session');
const path = require('path');

// Initializing app
const app = express();

// Creating an express session for passing user info across pages
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

const PORT = process.env.PORT || 3300;

// For loading in css and bootstrap
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
                req.session.user = existingUser;
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
    const user = req.session.user;
    console.log(user);
    res.render("home.ejs", { user })
})

app.get('/pantry', (req, res) => {
    const user = req.session.user;
    if (user === undefined){
        res.redirect("/login")
    }
    else {
        console.log(user.Username);
        getUserIngredients(user.Id)
            .then(ingredients => {
                console.log(ingredients[0]);
                res.render("pantry.ejs", { user, ingredients })
            })
    }
})

app.get('/profile', (req, res) => {
    const user = req.session.user;
    if (user === undefined) {
        res.redirect("/login")
    }
    else {
        res.render("profile.ejs", { user } )
    }
    console.log(user);
})

app.get('/cookbook', (req, res) => {
    res.render("cookbook.ejs")
})

app.get('/add-ingredient', (req, res) => {
    res.render("add-ingredient.ejs")
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});