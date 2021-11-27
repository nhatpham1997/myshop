const { responseSender } = require("../middlewares/response");
const { userService, tokenService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async(req, res) => {
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

const refreshTokens = catchAsync(async(req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send(responseSender({ data: {...tokens } }));
});

const forgotPassword = catchAsync(async(req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
        req.body.email
    );
    await emailService.sendResetPasswordEmail(
        req.body.email,
        resetPasswordToken
    );
    res.status(httpStatus.NO_CONTENT).send(responseSender({ data: null }));
});

const resetPassword = catchAsync(async(req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send(responseSender({ data: null }));
});

const sendVerificationEmail = catchAsync(async(req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
        req.user
    );
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send(responseSender({ data: null }));
});

const verifyEmail = catchAsync(async(req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send(responseSender({ data: null }));
});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};