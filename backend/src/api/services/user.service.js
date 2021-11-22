const httpStatus = require("http-status");
const { User } = require("../models");
const APIError = require("../utils/APIError");

const createUser = async(userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new APIError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const user = await User.create(userBody);
    return user;
};

const getUserById = async(id) => {
    return User.findById(id).populate("avatar");
};

module.exports = {
    createUser,
    getUserById,
};