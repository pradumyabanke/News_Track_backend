const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    categories_name: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("Categories", CategoriesSchema)