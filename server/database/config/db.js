const env = require('./env');
const Sequelize = require('sequelize-cockroachdb');     // Import Sequelize
var fs = require('fs');
/** sqlite3 connections
const sequelize = new Sequelize({           // Set database connections
    dialect: env.DATABASE_DIALECT,
    storage: env.DATABASE_STORAGE
});
**/

// Connect to CockroachDB through Sequelize.
const sequelize = new Sequelize('honk-bonk-830.defaultdb', 'cindy', 'bMGsDsyvG_9Yyu8w', {
    dialect: 'postgres',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    port: 26257,
    logging: console.log,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(__dirname + '/my_cert/cc-ca.crt').toString(),
        }
    }
});

const seed = require('./seed');

// Connect to database
sequelize.authenticate()
    .then(function () {
        console.log('Connection Success');
    })
    .catch(function (error) {
        console.log('Connection Failed');
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.medical_history = require('../models/medical_history')(Sequelize, sequelize);    // Creates medical history table based on the medical_history object
db.users = require('../models/user')(Sequelize, sequelize);                         // Creates users table based on the user object specified in user.js
db.medical_history.belongsTo(db.users);
sequelize.sync({force: true})                                               // Delete and reseed database upon every instantiation
    .then(() => seed(db.medical_history, db.users))                                 // Seeds the preset values into the tables
    .catch(error => console.log("Query Failed " + error));

module.exports = db;