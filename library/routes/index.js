var express = require("express");
var router = express.Router();
var register = require("./../modules/Register/registerRoute");
var login = require("./../modules/Login/loginController");


router.use('/register/', register);
router.use('/login/', login);

module.exports = router;
