const mongoose = require("mongoose");

const EpaperSchema = new mongoose.Schema({
    
    userId: { type: String, require: true },
    category: { type: String, require: true },
    pdf: { type: String, require: true },
    city: { type: String, require: true },
    date: { type: String, require: true },
    image: { type: String, require: true },
    pdf_name: { type: String, require: true },
   

}, { timestamps: true });

module.exports = mongoose.model("Epaper", EpaperSchema)

