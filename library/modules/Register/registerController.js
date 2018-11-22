const express = require('express');
const app = express();
const mongoose = require("mongoose");
const User = require("./user");
const bcrypt = require("bcrypt");


exports.registerUser = (req, res,err) => {
  User.findOne({ username: req.body.username }).then(person => {
    if (person) {
      return res.status(409).json({
        code:409,
        status: 'Conflict',
        message: "User is already existed!",
        errmsg: err.toString()
      });
    } else {
      //Inserting data into the collection
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        Date: req.body.Date
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(person => res.json(person))
            .catch(err => console.log(err));
        });
      });
    }
  });
};
