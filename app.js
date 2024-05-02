// Importing libraries
const { getUser, addUser, getUserIngredients, addIngredient } = require('./database.js')
const express = require('express');
const session = require('express-session');
const path = require('path');

// Initializing app
const app = express();

// Creating an express session for passing user info across pages (caching)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

const PORT = process.env.PORT || 3300;

// Middleware

// For loading in css and bootstrap
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// For parsing incoming requests
app.use(express.urlencoded({extended: false}));

// Routes

// For handling registration form submission
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

// For handling login form submission
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

// For handling the add ingredient form submission
app.post("/add-ingredient", async (req, res) => {
       const name = req.body.ingredientName;
       const user = req.session.user;

       if (user === undefined) {
            console.log("Not logged in. Cannot add ingredients.");
            res.redirect("/login");
       }
       else {
            addIngredient(name, user.Id)
                .then(newIngredient => {
                    if (newIngredient === 1) {
                        console.log("Ingredient added for user.");
                        res.redirect("/add-ingredient");
                    }
                    else {
                        console.error("Failed to add ingredient for user");
                        res.redirect("/add-ingredient");
                    }
                })

       }
})

// Route to handle GET requests to the '/login' endpoint
app.get('/login', (req, res) => {
    res.render("login.ejs")
})

// Route to handle GET requests to the '/login-error' endpoint
app.get('/login-error', (req, res) => {
    res.render("login-error.ejs")
})

// Route to handle GET requests to the '/register' endpoint
app.get('/register', (req, res) => {
    res.render("register.ejs")
})

// Route to handle GET requests to the '/register-error' endpoint
app.get('/register-error', (req, res) => {
    res.render("register-error.ejs")
})

// Route to handle GET requests to the '/home' endpoint
app.get('/home', (req, res) => {
    const user = req.session.user;
    console.log(user);
    res.render("home.ejs", { user })
})

// Route to handle GET requests to the '/pantry' endpoint
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

// Route to handle GET requests to the '/profile' endpoint
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

// Route to handle GET requests to the '/cookbook' endpoint
app.get('/cookbook', (req, res) => {
    res.render("cookbook.ejs")
})

// Route to handle GET requests to the '/add-ingredient' endpoint
app.get('/add-ingredient', (req, res) => {
    res.render("add-ingredient.ejs")
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});