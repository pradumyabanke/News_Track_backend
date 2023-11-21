const mongoose = require("mongoose");
//UserModel
const userSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    token: { type: String, required: true },
    approved_by: { type: String, default:"" },


}, { timestamps: true });

module.exports = mongoose.model("CreateUser", userSchema)

