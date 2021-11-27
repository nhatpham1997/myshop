const express = require("express");
const { authorize, ADMIN, LOGGED_USER } = require("../middlewares/auth");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");

const router = express.Router();

router
    .route("/")
    .post(
        auth("manageUsers"),
        validate(userValidation.createUser),
        userController.createUser
    )
    .get(
        auth("getUsers"),
        validate(userValidation.getUsers),
        userController.getUsers
    );

router.route("/profile").get(auth(), userController.getProfile);

router
    .route("/:userId")
    .get(
        auth("getUsers"),
        validate(userValidation.getUser),
        userController.getUser
    )
    .patch(
        auth("manageUsers"),
        validate(userValidation.updateUser),
        userController.updateUser
    )
    .delete(
        auth("manageUsers"),
        validate(userValidation.deleteUser),
        userController.deleteUser
    );

module.exports = router;