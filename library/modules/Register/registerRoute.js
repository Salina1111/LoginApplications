var express = require("express"),
router = express.Router(),
register = require("./registerController");

router.post('/create', register.registerUser);

module.exports = router;
