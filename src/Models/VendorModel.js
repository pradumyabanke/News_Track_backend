const mongoose = require("mongoose");
//PublicationDetailsModel

const PublicationDetailsSchema = new mongoose.Schema(
  {
    categories: {type: [String]},

    publisher_name: { type: String },
    type_of_Entity: { type: String },
    mobile: { type: Number, require: true },
    email: { type: String, require: true },
    password: { type: String },
    owner_key: { type: String },
    publisher_BIO: { type: String },
    account_manager: { type: String },

    publication_name: { type: String },
    Lang_of_Publication: { type: String },
    city_of_publication: { type: String },
    frequency_of_publication: { type: String },
    circulation: { type: String },
    RNI_No: { type: String },
    RNI_Regn_date: { type: String },

    tech_name: { type: String, require: true },
    tech_mobile: { type: Number, require: true },
    tech_email: { type: String, require: true },
    finance_name: { type: String, require: true },
    finance_mobile: { type: Number, require: true },
    finance_email: { type: String, require: true },
    sales_name: { type: String, require: true },
    sales_mobile: { type: Number, require: true },
    sales_email: { type: String, require: true },
    editorial_name: { type: String, require: true },
    editorial_mobile: { type: Number, require: true },
    editorial_email: { type: String, require: true },

    regd_address: { type: String, require: true },
    regd_state_city: { type: String },
    regd_pin_code: { type: Number },
    comm_address: { type: String, require: true },
    comm_state_city: { type: String },
    comm_pin_code: { type: Number },

    pub_social_facebook: { type: String },
    pub_social_twitter: { type: String },
    pub_social_linkedin: { type: String },
    pub_social_instagram: { type: String },
    pub_social_youtube: { type: String },

    domain_name: { type: String },
    logo_large: { type: String },
    logo_small: { type: String },
    site_display_contact: { type: String },
    publisher_site_mobile: { type: Number },
    publisher_site_email: { type: String },

    PAN_No: { type: String },
    GST_No: { type: String },
    Bank_acc_No: { type: Number },
    Bank_name: { type: String },
    Branch_name: { type: String },
    IFSC_code: { type: String },

    Revenue_Share: { type: String, require: true },
    Agreement_Start_Date: { type: String, require: true },
    Agreement_End_Date: { type: String, require: true },
    Auto_Renewal: { type: String, require: true },
    Refferal_by: { type: String, require: true },

    status_user: { type: String },
    status_publication: { type: String },
    approved_by: { type: String, default:" " },
    templates: { type: Number },

    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PublicationDetails", PublicationDetailsSchema);
