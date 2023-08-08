const jwt  =  require('jsonwebtoken');
const Users =  require('../models/Users');

function authorize(roles = []) {
    return async(req, res, next) => {
      try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,"secretkey"); // Replace with your actual secret key
        const user = await Users.findOne({ _id: decoded._id});
        if (!user) {
          throw new Error();
        }
  
        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ error: 'Unauthorized' });
        }
  
        req.user = user;
        req.token = token;
        next();
      } catch (e) {
        res.status(401).json({ error: 'Please authenticate' });
      }
    };
  }
  
  module.exports = authorize;
  
  
  

  