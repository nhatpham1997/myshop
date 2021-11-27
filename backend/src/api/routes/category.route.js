const express = require("express");
const { categoryController } = require("../controllers");
const validate = require("../middlewares/validate");
const { categoryValidation } = require("../validations");

const router = express.Router();

router.param("categoryId", categoryController.loadCategory);