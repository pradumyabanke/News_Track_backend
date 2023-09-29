const mongoose = require("mongoose");

const TemplatesSchema = new mongoose.Schema({
    
    image: { type: String, require: true },
    template_name: { type: String, require: true },
    template_ip: { type: String, require: true }
   


}, { timestamps: true });

module.exports = mongoose.model("Templates", TemplatesSchema)

