const User = require("../models/user.model");

exports.create = async(req, res, next) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(User.checkDuplicateEmail(error));
    }
};