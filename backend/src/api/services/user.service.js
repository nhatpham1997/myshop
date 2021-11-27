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

const queryUsers = async(filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};

const getUserById = async(id) => {
    return User.findById(id).populate("avatar");
};

const getUserByEmail = async(email) => {
    return User.findOne({ email });
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
};