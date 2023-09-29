const mongoose = require("mongoose");

const SubCategoriesSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    subcategories_name: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("subCategories", SubCategoriesSchema)