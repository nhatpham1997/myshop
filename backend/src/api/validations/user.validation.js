const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

// POST /users
const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid("user", "admin"),
    }),
};

// GET /users
const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

// GET /users/:userId
const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

// PATCH /users/:userId
const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
            role: Joi.string().required().valid("user", "admin"),
        })
        .min(1),
};

// DELETE /users/:userId
const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};