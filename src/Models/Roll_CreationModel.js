const mongoose = require("mongoose");

const ROllCreationModelSchema = new mongoose.Schema(
    {
        userId: { type: String },
        role_name: { type: String, required: true },
        Upload_E_Paper: { type: Boolean, default: false },
        View_E_Paper: { type: Boolean, default: false },
        Publish_E_Paper: { type: Boolean, default: false },
        Edit_E_Paper: { type: Boolean, default: false },
        View_Published_E_Paper: { type: Boolean, default: false },

        Create_New_Post: { type: Boolean, default: false },
        View_Draft_Posts: { type: Boolean, default: false },
        Approve_News: { type: Boolean, default: false },
        Scheduled_News: { type: Boolean, default: false },
        View_Published_News: { type: Boolean, default: false },
        Edit_Published_News: { type: Boolean, default: false },

        Place_New_Ad: { type: Boolean, default: false },
        View_Already_Palaced_Ads: { type: Boolean, default: false },
        Edit_Already_Palaced_Ads: { type: Boolean, default: false },

        News_Paper_Registration: { type: Boolean, default: false },
        View_Registered_News_Papers: { type: Boolean, default: false },
        Edit_Registered_News_Papers: { type: Boolean, default: false },

        Template_Assign: { type: Boolean, default: false },
        Template_Settings_changes_Assigned: { type: Boolean, default: false },
        Template_assigned_view_Current_config: { type: Boolean, default: false },
        Template_assigned_Edit: { type: Boolean, default: false },

        Self_User_Creation: { type: Boolean, default: false },
        Self_User_Edit: { type: Boolean, default: false },
        Self_User_View: { type: Boolean, default: false },
        Self_User_Custom_Rights_assign: { type: Boolean, default: false },
        News_Paper_User_Creation: { type: Boolean, default: false },
        News_Paper_User_Edit: { type: Boolean, default: false },
        News_Paper_User_View: { type: Boolean, default: false },
        News_Paper_User_Custom_Rights_assign: { type: Boolean, default: false },

        Meta_Parameters_for_categories: { type: Boolean, default: false },
        RSS_Feed_Generation: { type: Boolean, default: false },
        Site_Map_Generation: { type: Boolean, default: false },

        Reports: { type: Boolean, default: false },

        Analytics: { type: Boolean, default: false },

        Social_Media: { type: Boolean, default: false },

        Revenue_Input_for_each_partner: { type: Boolean, default: false },
        Final_revenue_after_calculation: { type: Boolean, default: false },

        View_Update: { type: Boolean, default: false },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Roll-Creation", ROllCreationModelSchema);
