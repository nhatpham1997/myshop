const { responseSender } = require("../middlewares/responseSender");
const { userService, tokenService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async(req, res) => {
    console.log(req.body);
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send(responseSender({ data: { user, tokens } }));
});

const login = catchAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send(responseSender({ data: { user, tokens } }));
});

const logout = catchAsync(async(req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    register,
    login,
};