const mongoose = require("mongoose");

const AdvertisementSettingsSchema = new mongoose.Schema({

    userId: { type: String },
    vendor_name: { type: String, require: true },
    template: { type: String, require: true },
    page_name: { type: String, require: true },
    top_box: { type: String, require: true, default: false },
    below_category: { type: String, require: true, default: false },
    between_category: { type: String, require: true, default: false },
    footer: { type: String, require: true, default: false },
   
}, { timestamps: true });

module.exports = mongoose.model("AdvertisementSettings", AdvertisementSettingsSchema)