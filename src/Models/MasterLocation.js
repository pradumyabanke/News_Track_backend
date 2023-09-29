const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    countries: {
        name: { type: String, require: true },
        states: [{
            name: { type: String, require: true },
            division: [{
                name: { type: String, require: true },
                district: [{
                    name: { type: String, require: true },
                    sub_division: [{
                        name: { type: String, require: true },
                        tahsil: [{
                            name: { type: String, require: true },
                            town: [{
                                name: { type: String, require: true }
                            }]
                        }]
                    }]
                }]
            }]
        }],
         _id: false // Disable automatic _id generation for sub-divisions
    },
    Hindi: { type: String, require: true },
    English: { type: String, require: true },
    url: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model("MasterLocation", LocationSchema);
