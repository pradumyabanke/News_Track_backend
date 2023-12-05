const mongoose = require("mongoose");
//UserModel
const UserRoleSchema = new mongoose.Schema({

    user_name: { type: String, require: true },
    password: { type: String, require: true },
    first_name: { type: String, require: true },
    middle_name: { type: String, require: true },
    last_name: { type: String, require: true },
    department: { type: String, require: true },
    user_role: { type: String, require: true },
    user_superior: { type: String, require: true },
    byline: { type: String, require: true },
    display_name: { type: String, require: true },
    mobile_1: { type: Number, required: true, unique: true },
<<<<<<< HEAD
    email: { type: String, required: true, unique: true },
    mobile_2: { type: Number, required: true, unique: true },
    email_1: { type: String, required: true, unique: true },
=======
    email_1: { type: String, required: true, unique: true },
    mobile_2: { type: Number, required: true, unique: true },
    email_2: { type: String, required: true, unique: true },
>>>>>>> origin/main
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pin_code: { type: Number },
    user_image: { type: String },
    user_BIO: { type: String },
    social_facebook: { type: String },
    social_twitter: { type: String },
    social_linkedin: { type: String },
    social_instagram: { type: String },
    token: { type: String, require: true },

}, { timestamps: true });

<<<<<<< HEAD

module.exports = mongoose.model("RoleManagement", UserRoleSchema)
=======
module.exports = mongoose.model("UserRole", UserRoleSchema)
>>>>>>> origin/main
