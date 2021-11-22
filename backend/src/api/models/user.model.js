const mongoose = require("mongoose");
const validator = require("validator");
const CryptoJS = require("crypto-js");
const { config } = require("dotenv");
const { toJSON } = require("./plugins");

/**
 * User Roles
 */
const roles = ["user", "admin"];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and one number"
                );
            }
        },
        private: true,
    },
    name: { type: String, required: true, trim: true },
    role: {
        type: String,
        enum: roles,
        default: "user",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function(email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this;
    return CryptoJS.AES.decrypt(user.password, config.passwordSecret);
};

userSchema.pre("save", async function save(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await CryptoJS.AES.encrypt(
            user.password,
            config.passwordSecret
        );
    }
    next();
});

// userSchema.static = {
//     checkDuplicateEmail(error) {
//         if (error.name === "MongoError" && error.code === 11000) {
//             return new APIError({
//                 message: "Validation Error",
//                 errors: [{
//                     field: "email",
//                     location: "body",
//                     messages: ['"email" already exists'],
//                 }, ],
//                 status: httpStatus.CONFLICT,
//                 isPublic: true,
//                 stack: error.stack,
//             });
//         }
//         return error;
//     },
// };

module.exports = mongoose.model("User", userSchema);