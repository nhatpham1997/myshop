const express = require("express");
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const config = require("../../config/config");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
    "/register",
    validate(authValidation.register),
    authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

// router.post("/register", async(req, res) => {
//     const newUser = new User({
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASS_SEC
//         ).toString(),
//         name: req.body.name,
//     });

//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong credentials!");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            config.passwordSecret
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong credentials!");
        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            },
            config.jwt.secret, { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;