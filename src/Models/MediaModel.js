const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    media_type: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("mediaType", CategoriesSchema)