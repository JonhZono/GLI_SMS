module.exports = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.send(
      'You do not have correct privilege to perform this operation.'
    );
  }
  next();
};
