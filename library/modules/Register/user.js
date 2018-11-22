const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


//Defining the Schema
let userSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String },
  lastName: String,
  email: { type: String },
  username: { type: String },
  password: String,
  Date: { type: Date, default: Date.now }
});

//To use created schema -> convert schema into Model
let User = mongoose.model("Users", userSchema);

module.exports = User;
