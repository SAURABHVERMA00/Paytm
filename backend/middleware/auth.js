const { validateToken } = require("../service/auth");

function checkForAuthenticationUser(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
      const payload = validateToken(token);
      req.user = payload;
    } catch (error) {}

    return next();
  };
}

module.exports = {
  checkForAuthenticationUser,
};
