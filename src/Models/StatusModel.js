const mongoose = require("mongoose");

const StatusModelSchema = new mongoose.Schema({

    user_status: { type: String }


}, { timestamps: true });

module.exports = mongoose.model("Status", StatusModelSchema)