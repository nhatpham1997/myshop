const httpStatus = require("http-status");
const userService = require("./user.service");
const APIError = require("../utils/APIError");
const Token = require("../models/token.model");
const tokenService = require("./token.service");
const { tokenTypes } = require("../../config/tokens");

const login = async(email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new APIError(
            httpStatus.UNAUTHORIZED,
            "Incorrect email or password"
        );
    }
    return user;
};

const logout = async(refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false,
    });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await refreshTokenDoc.remove();
};

const refreshAuth = async(refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(
            refreshToken,
            tokenTypes.REFRESH
        );
        const user = await userService.getUserById(refreshTokenDoc.user);
        console.log(refreshTokenDoc);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new APIError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
};

module.exports = {
    login,
    logout,
    refreshAuth,
};