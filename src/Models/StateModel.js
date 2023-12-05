const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
<<<<<<< HEAD
    Country: { type: String, required: true },
    States: { type: String, required: true },
    Division: { type: String, required: true },
    District: { type: String, required: true },
    SubDivision: { type: String, required: true },
    Tahsil: { type: String, required: true },
    Town: { type: String, required: true },
    Hindi: { type: String, required: true },
    English: { type: String, required: true },
    URL: { type: String, required: true },
});

module.exports = mongoose.model("Location", stateSchema)
=======
    countries: [{
        country: {
            type: String,
            require: true
        },
        states: [{type: String,}]
    }],
});



module.exports = mongoose.model("indian-states-cities", stateSchema)
>>>>>>> origin/main
