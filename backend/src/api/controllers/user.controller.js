const httpStatus = require("http-status");
const { userService } = require("../services");
const { responseSender } = require("../middlewares/responseSender");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async(req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(
        responseSender({ data: user, message: "Create user successfully!" })
    );
});

const getUsers = catchAsync(async(req, res) => {
    const filter = pick(req.query, ["name", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await userService.queryUsers(filter, options);
    res.status(200).send(responseSender({ data: result }));
});

const getUser = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(responseSender({ data: user }));
});

const updateUser = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(responseSender({ data: user }));
});

const updateProfile = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.user._id, req.body);
    res.send(responseSender({ data: user }));
});

const getProfile = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.user._id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(responseSender({ data: user }));
});

const deleteUser = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send(responseSender({ data: null }));
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateProfile,
    getProfile,
};