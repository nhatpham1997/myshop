const userService = require("./user.service");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");

const login = async(email, password) => {
    const user = await userService.getUserById(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new APIError(
            httpStatus.UNAUTHORIZED,
            "Incorrect email or password"
        );
    }
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

module.exports = {
    login,
    logout,
};