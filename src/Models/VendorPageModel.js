const mongoose = require("mongoose");

const VendorPageNameLocationSchema = new mongoose.Schema({

    userId: { type: String },
    page_name: { type: [String], require: true },
    page_location: { type: [String], require: true },
    

}, { timestamps: true });

module.exports = mongoose.model("VendorPageNameLocation", VendorPageNameLocationSchema)