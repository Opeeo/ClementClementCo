// Imports
var jwt = require('jsonwebtoken');
var models = require('../models');

const JWT_SIGN_SECRET = 'qgsrgb1srgb51strb5q1vbs1bq6bs6b51sgb65s4bs6d54s';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
     return jwt.sign({
        userId: userData.id,
        surname: userData.surname,
        nomStatus: userData.Statue.nameStatus
        
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      })

  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}
