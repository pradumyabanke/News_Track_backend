const mongoose = require("mongoose");

const SelectSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    select_name: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("Select", SelectSchema)