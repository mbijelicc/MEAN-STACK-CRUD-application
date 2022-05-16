const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const book = require('./app/routes/book');
const app = express();

var corsOptions = {
  origin: "https://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//models used for the database
const db = require("./app/models");
const Role = db.role;

//connecting to the mongodb with credentials given in db.config.js
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

//route that will display this message if other specified routes are not requested - used for debugging
app.get("/", (req, res) => {
  res.json({ message: "Mirjana Bijelic 2019230099 Final Exam - SASE" });
});

//all routes are specified in /app/routes and given to express (app)
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/book")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//when first installing node_modules, these 2 roles will be added to the database - roles
//initial() function will creat 2 rles in roles collection
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });

}
module.exports = app;