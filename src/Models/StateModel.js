const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    countries: [{
        country: {
            type: String,
            require: true
        },
        states: [{type: String,}]
    }],
});



module.exports = mongoose.model("indian-states-cities", stateSchema)
