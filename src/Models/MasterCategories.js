const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    
    categories_Name_Hindi: { type: String, require: true },
    categories_Name_English: { type: String, require: true },
    categories_Name_Url: { type: String, require: true },

}, { timestamps: true });


module.exports = mongoose.model("MasterCategories", CategoriesSchema)