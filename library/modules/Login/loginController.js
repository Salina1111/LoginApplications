const mongoose = require("mongoose");
const User = require("./../Register/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//To use Promise in Mongoose
mongoose.Promise = Promise;

exports.loginUser = (req, res,err) => {
  User.findOne({email: req.body.email})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
         if(err) {
            return res.status(401).json({
              code: 401,
              status: "failed",
               message: 'Unauthorized Access',
               errmsg: err.toString()

            });
         }

         if(result) {
           const value = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
              _id: user._id
           }
          const JWTToken = jwt.sign(value,
             'secret',
              {
                expiresIn: '24h'
              });
              return res.status(200).json({
                status: 'Success',
                message : 'Welcome to the JWT Auth',
                value:value,
                token: JWTToken
              });
         }
         if(result) {
            return res.status(200).json({
              code:200,
              status:"success",
               "message": 'Welcome to the JWT Auth'
            });
         }
         return res.status(401).json({
           code: 401,
           status: "failed",
            message: 'Incorrect Password!!'
         });
      });
   })
   .catch(error => {
      res.status(500).json({
        code:500,
        status:"Error",
         message: "Username or password is incorrect!!"
      });
   });;
};
