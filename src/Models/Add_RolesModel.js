const mongoose = require("mongoose");

const AddRolesModelSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    role_name: { type: String, required: true },
    status: { type: String, required: true },
    department: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    designation: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    role: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    main_menu: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    subMenu_level_1: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    subMenu_level_2: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    create_user: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    user_role_custom: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    post_news: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    create_project: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    create_job_task: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
    assign_task: {
      type: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      default: { add: false, edit: false, view: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Add_roles", AddRolesModelSchema);
