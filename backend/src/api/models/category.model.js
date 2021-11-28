const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

categorySchema.statics.isSlugTaken = async function(slug, id) {
    const options = { slug };
    const _id = new ObjectID(id);
    if (id) {
        options._id = { $ne: _id };
    }
    const category = await this.findOne(options);
    return !!category;
};

module.exports = mongoose.model("Category", categorySchema);