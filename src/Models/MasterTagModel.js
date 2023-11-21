const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({

    tag_name: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("MasterTag", TagSchema)