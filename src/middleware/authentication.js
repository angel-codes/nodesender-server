const jtw = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const jsontoken = req.get('Authorization');

  // check if the token exists
  if (!jsontoken) {
    // send error
    return res.status(401).json({
      response: 'fail',
      data: 'You dont have authorization'
    });
  }

  jtw.verify(jsontoken.split(' ')[1], process.env.SECRET, (error, decoded) => {
    if (error) {
      // send error
      return res.status(401).json({
        response: 'fail',
        data: 'You dont have authorization'
      });
    }
    req.user = decoded;
    next();
  });
};
