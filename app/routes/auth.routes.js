const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const User = require ('../models/user.model');
const { append } = require("express/lib/response");
const bcrypt = require("bcryptjs/dist/bcrypt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //sign up function for new users
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  
  
  app.put('/api/auth/reset-password:id', (req, res, next) => {
    let userCredential = req.body;
    User.findOne({email: userCredential.email}, function(err, userExist){
        if(userExist) {

          User.findOneAndUpdate({email: userCredential.email}, {password : bcrypt.hashSync(userCredential.password, 8)},
            (error, user) => {
              if(error) {
                console.log('FAIL');
                return next(error);

              } else {
                res.status(200).json(user);
                console.log('SUCCESS');
                  }
            });
          }
      })
  })
};
