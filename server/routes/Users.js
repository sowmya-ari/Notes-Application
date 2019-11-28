var express = require("express");
var router = express.Router();
var controller = require("../controllers/Users");

router.post("/register", controller.Register);
router.post("/login", controller.Login);

module.exports = router;
