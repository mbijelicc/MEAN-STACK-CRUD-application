const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //everyone can access
  app.get("/api/test/all", controller.allAccess);
  //for logged in user with role user. Verifying with JWT token
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  //for logged in user with role admin. Verifying with TWT token
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
