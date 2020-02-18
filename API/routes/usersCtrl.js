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
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
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
                        idStatus: 2
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        });
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'connot add user'});
                    });
            });

          } else {
              return res.status(409).json({ 'error': 'user already exist' });
          }
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
  },
  login: function(req, res) {

    var email    = req.body.email;
    var password = req.body.password;

    if (email == null ||  password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.Users.findOne({
        where: { email: email }
    })
    .then(function(userFound) {
        if (userFound){

            bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt){
                if(resBcrypt){
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    })
                } else {
                    return res.status(403).json({ 'error': 'invalid password'});
                }
            })
        } else {
            return res.status(403).json({ 'error': 'user not exist in DB'})
        }
    
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': err})
    })
    

}
}