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

function getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results[0].Username); // Assuming username is unique, so only return the first result
        });
    });
}

function doesUserExist(username, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS count FROM Users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            const userCount = results[0] ? results[0].count : 0;
            resolve(userCount > 0); // Resolve with true if user count is greater than 0, indicating user exists
        });
    });
}

module.exports = { getUserByUsernameAndPassword };
module.exports = { doesUserExist };


