const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');
  try {
    //check if token exist
    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized, access denied' }] });
    }
    //verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token is invalid!' }] });
  }
};
