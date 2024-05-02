const mysql = require('mysql2');

// Create a connection pool
const db = mysql.createConnection({
    host: 'recipeappdbinstance.c1eq4a4gwcx9.us-east-2.rds.amazonaws.com',
    port:  3306,
    user: 'admin',
    password: 'FoodApp$$81',
    database: 'RecipeApp'
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
        }
        console.log("Database connected.");
});

// Function for getting a user by username and password
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


// Function to get user ingredients from the database
function getUserIngredients(userId) {

}


function addIngredientToUser(){
}

module.exports = { getUser, addUser }

