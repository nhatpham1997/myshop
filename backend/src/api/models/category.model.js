const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 128,
        trim: true,
        required: true,
    },
    descriptions: String,
});

categorySchema.static = {
    asyncget(id) {
        try {
            let category;

            if (mongoose.Types.ObjectId.isValid(id)) {
                category = await this.findById(id).exec();
            }

            if (category) {
                return category;
            }

            throw new APIError({
                message: "Category does not exists",
                status: httpStatus.NOT_FOUND,
            });
        } catch (error) {
            throw error;
        }
    },
};

categorySchema.method({
    transform() {
        const transformed = {};
        const fields = ["_id", "name", "descriptions"];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        return transformed;
    },
});

module.exports = mongoose.model("Category", categorySchema);