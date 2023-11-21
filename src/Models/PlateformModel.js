const mongoose = require("mongoose");

const PlateformSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    plateform_name: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("Plateform", PlateformSchema)