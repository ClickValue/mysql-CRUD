const auth_data = require("../../../auth_data");

module.exports = (req, res, next) => {
  const token = req.query.token;
  let result;
  if (token) {
    if (token === auth_data.API_token) {
      next();
    } else {
      result = {
        error: "Token error.",
        status: 400,
      };
      res.status(400).send(result);
    }
  } else {
    result = {
      error: "Authentication error. Token required.",
      status: 401,
    };
    res.status(401).send(result);
  }
};
