const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    country: { type: String, require: true },
    alpha2Code: { type: String, require: true },
    alpha3Code: { type: String, require: true },
    numberCode: { type: String, require: true },
    states: [{ type: String }],

});



module.exports = mongoose.model("indian-states-cities", stateSchema)
