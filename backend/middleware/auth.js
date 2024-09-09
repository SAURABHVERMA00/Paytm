const { validateToken } = require("../service/auth");

const checkForAuthenticationUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // it means you shoulds space between  bearer and token then 2 means take token in this variable
    const payload = validateToken(token);
    req.user = payload;
    next();

  } else {
    res.sendStatus(401).json({ message: "Token not found" }) ;
  }
};

module.exports = {
  checkForAuthenticationUser,
};
