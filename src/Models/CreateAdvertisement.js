const mongoose = require("mongoose");

const CreateAdvertisementsSchema = new mongoose.Schema({

    userId: { type: String },
    page_name: { type: String, require: true },
    page_location: { type: String, require: true },
    desktop: { type: String, require: true },
    start_date: { type: String, require: true },
    end_date: { type: String, require: true },
    image: { type: String, require: true },
    script: { type: String, require: true },
    text: { type: String, require: true },
    type_of_ad: { type: String, require: true },
    templates: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("CreateAdvertisement", CreateAdvertisementsSchema)