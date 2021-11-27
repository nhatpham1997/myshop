const { Category } = require("../models");
const catchAsync = require("../utils/catchAsync");

const loadCategory = catchAsync(async(req, res, id) => {
    const category = await Category.get(id);
    req.locals = { category };
});

const createCategory = catchAsync(async(req, res) => {
    let category = await new Category(req.body).save();
    res.status(httpStatus.CREATED);
    category = await category.transform();
    return res.json(category);
});

module.exports = {
    createCategory,
    loadCategory,
};