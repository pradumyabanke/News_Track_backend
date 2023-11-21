const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    language_name: { type: String, require: true },


}, { timestamps: true });

module.exports = mongoose.model("Language", LanguageSchema)