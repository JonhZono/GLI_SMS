module.exports = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.send(
      'You do not have correct privilege to perform this operation.'
    );
  }
  next();
};
