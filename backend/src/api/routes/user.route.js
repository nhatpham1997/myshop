const express = require("express");
const { authorize, ADMIN, LOGGED_USER } = require("../middlewares/auth");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");

const router = express.Router();

router
    .route("/")
    .post(
        authorize(ADMIN),
        validate(userValidation.createUser),
        userController.createUser
    );

module.exports = router;