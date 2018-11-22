var express = require("express"),
 router = express.Router(),
 login = require("./loginController");

router.post('/log', login.loginUser);

module.exports = router;