const mongoose = require("mongoose");
const moment = require("moment");

const PostArticleSchema = new mongoose.Schema({

    userId: { type: String, require: true },
    category: { type: String, require: true },
    title: { type: String, require: true },
    sub_heading: { type: String, require: true },
    short_details: { type: String, require: true },
    body: { type: String, require: true },
    image: { type: String, require: true },
    url: { type: String, require: true },
    tags: { type: [String], require: true },
    news_priority: { type: String, require: true },
    news_sections: { type: String, require: true },
    change_byline: { type: String, require: true },
    source: { type: String, require: true },
    isApproved: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    remark: { type: String, default: " " },
    author_name: { type: String, require: true },
    schedule_time: {
        type: String,
        default: function () {
            return moment().format("HH:mm");
        }
    },
    schedule_date: {
        type: String,
        default: function () {
            return moment().format("YYYY-MM-DD");
        }
    },
    approved_by: { type: String, default: " " },
    font: { type: String, require: true },
    x_min: { type: Number, require: true },
    y_min: { type: Number, require: true },
    x_max: { type: Number, require: true },
    y_max: { type: Number, require: true },
    page_number: { type: Number, require: true },
    pdf_name: { type: String, require: true },
    date: { type: String, require: true },
    manual_tag: { type: String, require: true },



}, { timestamps: true });

module.exports = mongoose.model("PostArticle", PostArticleSchema)