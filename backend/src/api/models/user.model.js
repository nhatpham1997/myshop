const mongoose = require("mongoose");

/**
 * User Roles
 */
const roles = ["user", "admin"];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: { type: String, required: true, trim: true },
    role: {
        type: String,
        enum: roles,
        default: "user",
    },
}, { timestamps: true });

userSchema.pre("save", async function save(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.static = {
    checkDuplicateEmail(error) {
        if (error.name === "MongoError" && error.code === 11000) {
            return new APIError({
                message: "Validation Error",
                errors: [{
                    field: "email",
                    location: "body",
                    messages: ['"email" already exists'],
                }, ],
                status: httpStatus.CONFLICT,
                isPublic: true,
                stack: error.stack,
            });
        }
        return error;
    },
};

module.exports = mongoose.model("User", userSchema);