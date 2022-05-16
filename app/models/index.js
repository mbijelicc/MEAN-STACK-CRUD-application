//specifing collections for different models

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.book = require("./Book");

db.ROLES = ["user", "admin"];

module.exports = db;