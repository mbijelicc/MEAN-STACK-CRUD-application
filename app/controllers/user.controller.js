
//public access for all
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

//users content - for registered and logged in users
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

//admins content - for registered and logged in admins
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


