const mysql = require('mysql2');

// For loading environment variables
require('dotenv').config();

// Create a connection pool using env
const db = mysql.createConnection({
    host: process.env.AWS_HOST,
    port:  process.env.AWS_PORT,
    user: process.env.AWS_USER,
    password: process.env.AWS_PASSWORD,
    database: process.env.AWS_DB
});

// Validating the database connection
db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
        }
        console.log("Database connected.");
});

// Function for getting a user by username and password using a promise for completion or failure of async operations
function getUser(username, password){
    return new Promise((resolve, reject) => {
       const sql = 'SELECT * FROM Users WHERE Username = ? AND Password = ?';
       db.query(sql, [username, password], (err, results) => {
           if (err) {
                reject(err);
           }
           else {
                if (results.length >= 0) {
                    resolve(results[0]);
                }
                else {
                    resolve(null);
                }
           }
       });
    });
}

// Function for adding a user
function addUser(username, password){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Users (Username, Password) VALUES (?, ?)';
        db.query(sql, [username, password], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("1 record inserted");
                resolve(1);
            }
        })
    })
}

// Function to get user ingredients
function getUserIngredients(userId) {
    return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Ingredients WHERE UserId = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) {
                     reject(err);
                }
                else {
                     if (results.length >= 0) {
                         resolve(results);
                     }
                     else {
                         resolve(null);
                     }
                }
            });
         });
}

// Function to save ingredient
function addIngredient(name, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Ingredients (Name, UserId) VALUES (?, ?)';
        db.query(sql, [name, userId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("1 record inserted");
                resolve(1);
            }
        })
    })
}

module.exports = { getUser, addUser, getUserIngredients, addIngredient }

