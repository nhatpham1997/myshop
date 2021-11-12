const express = require("express");

const router = express.Router();

router
    .route("/register")
    .post(authorize(ADMIN), validate(listUsers), controller.list);

module.exports = router;