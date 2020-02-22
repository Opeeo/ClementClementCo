// Imports
var bcrypt    = require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var asyncLib  = require('async');

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
  register: function(req, res) {
    
    // Params
    var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var name     = req.body.name;
    var surname  = req.body.surname;
    var pathPP   = req.body.pathPP;

    console.log(password);

    if (email == null || username == null || password == null || name == null || surname == null) {
      return res.status(400).json({
        'success': false,
        'message': 'missing parameters',
        'data': {}
    })
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({
        'success': false,
        'message': 'Wrong parameters:  username must be lenght 5-12',
        'data': {}
    })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        'success': false,
        'message': 'email is not valid',
        'data': {}
    })
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(200).json({
        'success': false,
        'message': 'password invalid (must length 4 - 8 and include 1 number at least)',
        'data': {}
    }) 
    
    }

        models.Users.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(userFound) {
          if (!userFound){

            bcrypt.hash(password, 12, function(err, bcryptedPassword){
                  var newUser = models.Users.create({
                        pathPP: pathPP,
                        username: username,
                        name: name,
                        surname: surname,
                        email: email,
                        password: bcryptedPassword,
                        isPrivate: 0,
                        StatueId: 2
                    })
                    .then(function(newUser){
                      return res.status(200).json({
                        'success': true,
                        'message': 'User added',
                        'data': {'user': newUser}
                    })
                    })
                    .catch(function(err){
                      return res.status(500).json({
                        'success': false,
                        'message': 'Cannot add user',
                        'err': err,
                        'data': {}
                      })
                    });
            });

          } else {
            return res.status(409).json({
              'success': false,
              'message': 'User already exist',
              'data': {}
            })
          }
        })
        .catch(function(err) {
          return res.status(403).json({
            'success': false,
            'message': 'Database error',
            'data': {}
          })
        });
  },
  login: function(req, res) {

    var email    = req.body.email;
    var password = req.body.password;

    if (email == null ||  password == null) {
      return res.status(400).json({
        'success': false,
        'message': 'Missing parameters',
        'data': {}
      })
    }

    models.Users.findOne({
        attributes: ['email', 'password', 'id', 'name', 'username', 'surname', 'isPrivate', 'StatueId', 'pathPP', 'createdAt', 'updatedAt'],
        where: { email: email },
        include: {model: models.Statues}
    })
    .then(function(userFound) {
        if (userFound){

            bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt){
                if(resBcrypt){                  
                  return res.status(200).json({
                    'success': true,
                    'message': 'User found',
                    'data': {'user': userFound, 'token': jwtUtils.generateTokenForUser(userFound)}
                })
                } else {
                  return res.status(403).json({
                    'success': false,
                    'message': 'Invalid password',
                    'data': {}
                  })
                }
            })
        } else {
            return res.status(403).json({
              'success': false,
              'message': 'User not found',
              'data': {}
            })
        }
    
    })
    .catch(function(err) {
      return res.status(500).json({
        'success': false,
        'message': 'Databse error',
        'data': {}
      })
    })
  }
}