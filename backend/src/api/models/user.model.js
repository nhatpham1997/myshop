const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON } = require("./plugins");
const { roles } = require("../../config/roles");

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
    return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function save(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);