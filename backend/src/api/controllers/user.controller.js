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

module.exports = {
    createUser,
    getUsers,
};