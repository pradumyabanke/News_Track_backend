const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CreateModel = require("../Models/SuperAdmin");
const PlateformModel = require("../Models/PlateformModel");
const CategoriesModel = require("../Models/CategoriesModel");
const SubCategoriesModel = require("../Models/SubCategoriesModel");
const LanguageModel = require("../Models/LanguageModel");
const MediaModel = require("../Models/MediaModel");
const StateModel = require("../Models/StateModel");
const CheckBoxModel = require("../Models/CheckBoxModel");
const SelectModel = require("../Models/SelectModel");
const UserRoleModel = require("../Models/User_RoleModel");
const StatusModels = require("../Models/StatusModel");
const VendorModel = require("../Models/VendorModel");
const PostNewsModel = require("../Models/PostArticleModel");
const SuperAdmin = require("../Models/SuperAdmin");
const PostArticleModel = require("../Models/PostArticleModel");
const Addrolesmodel = require("../Models/Add_RolesModel");
const DraftModel = require("../Models/DraftModel");
const RollCreation = require("../Models/Roll_CreationModel");
const masterCategories = require("../Models/MasterCategories");
const masterTag = require("../Models/MasterTagModel");
const CountryState = require("../Models/Country-State");



//===================== [ Create User ] =====================/

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let { name, phone, email, password, address } = data;

    if (await CreateModel.findOne({ phone: phone }))
      return res
        .status(400)
        .send({ status: false, message: "Phone already exist" });

    if (await CreateModel.findOne({ email: email }))
      return res
        .status(400)
        .send({ status: false, message: "Email already exist" });

    const encryptedPassword = bcrypt.hashSync(password, 12);
    req.body["password"] = encryptedPassword;

    var token = jwt.sign(
      {
        userId: CreateModel._id,
      },
      "project"
    );
    data.token = token;

    let savedData = await CreateModel.create(data);
    res.status(201).send({
      status: true,
      msg: "User Register successfull",
      data: {
        name: savedData.name,
        phone: savedData.phone,
        email: savedData.email,
        password: savedData.password,
        address: savedData.address,
      },
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ User Login ] =====================/

const userLogin = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    let userExists = await CreateModel.findOne({ email: email });

    if (!userExists) {
      return res.status(400).send({
        status: false,
        msg: "Email and Password is Invalid",
      });
    }

    let compared = await bcrypt.compare(password, userExists.password);
    if (!compared) {
      return res.status(400).send({
        status: false,
        message: "Your password is invalid",
      });
    }
    var token = jwt.sign(
      {
        userId: userExists._id,
      },
      "project"
    );

    let updateToken = await CreateModel.findByIdAndUpdate(
      { _id: userExists._id },
      { token },
      { new: true }
    );
    userExists.token = updateToken.token;

    return res.status(200).send({
      status: true,
      msg: "Super Admin Login successfully",
      data: userExists,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};


//===================== [ News Paper Agency Login ] =====================/

// const NewsPaperAgencyLogin = async function (req, res) {
//   try {
//     let data = req.body;
//     let { email, password } = data;

//     let userExists = await VendorModel.findOne({ email: email });

//     if (!userExists) {
//       return res.status(400).send({
//         status: false,
//         msg: "Email and Password is Invalid",
//       });
//     }

//     let compared = await bcrypt.compare(password, userExists.password);
//     if (!compared) {
//       return res.status(400).send({
//         status: false,
//         message: "Your password is invalid",
//       });
//     }

//     var token = jwt.sign(
//       {
//         userId: userExists._id,
//       },
//       "project"
//     );

// let updateToken = await VendorModel.findByIdAndUpdate(
//   { _id: userExists._id },
//   { token },
//   { new: true }
// );
// userExists.token = updateToken.token;

// return res.status(200).send({
//   status: true,
//   msg: "News Paper Agency Login successfully",
//   data: userExists,
// });
//   } catch (error) {
//     return res.status(500).send({
//       status: false,
//       msg: error.message,
//     });
//   }
// };
const NewsPaperAgencyLogin = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    let userExists = await VendorModel.findOne({ email: email });

    if (!userExists) {
      let userRole = await UserRoleModel.findOne({ email: email });
      let userId = req.query.userId;
      if (!userRole) {
        return res.status(400).send({
          status: false,
          msg: "Email and Password is Invalid",
        });
      }

      let compared = await bcrypt.compare(password, userRole.password);

      if (!compared) {
        return res.status(400).send({
          status: false,
          message: "Your password is invalid",
        });
      }

      var token = jwt.sign(
        {
          userId: userRole._id,
        },
        "project"
      );
      let updateToken = await UserRoleModel.findByIdAndUpdate(
        { _id: userRole._id },
        { token },
        { new: true }
      );
      userRole.token = updateToken.token;

      const role = userRole.user_role;
      if (roleAssign = await RollCreation.findOne({ userId: userId, role_name: role, })) {
        const AssignRole = roleAssign.role_name;
        if (role === roleAssign.role_name) {
          return res.status(200).send({
            status: true,
            msg: `Role Management Login Success And Permission To Access Role '${AssignRole}'`,
            data: userRole,
          });
        }
      } else {
        return res.status(200).send({
          status: true,
          msg: "Role Management Login Success No Access For Role To This User",
          data: userRole
        });
      }
    }

    let compared = await bcrypt.compare(password, userExists.password);

    if (!compared) {
      return res.status(400).send({
        status: false,
        message: "Your password is invalid",
      });
    }

    var token = jwt.sign(
      {
        userId: userExists._id,
      },
      "project"
    );

    let updateToken = await VendorModel.findByIdAndUpdate(
      { _id: userExists._id },
      { token },
      { new: true }
    );
    userExists.token = updateToken.token;

    return res.status(200).send({
      status: true,
      msg: "News Paper Agency Login successfully",
      data: userExists,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};


//===================== [ Create Plateform ]=====================/

const CreatePlateform = async function (req, res) {
  try {
    let data = req.body;
    let { id, plateform_name } = data;

    let plateform = await PlateformModel.create(data);
    res.status(201).send({
      status: true,
      message: "Plateform Created Successfully",
      data: plateform,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

//===================== [ Create Categories ] =====================/

const CreateCategories = async function (req, res) {
  try {
    let data = req.body;
    let { id, categories_name } = data;

    let categories = await CategoriesModel.create(data);
    res.status(201).send({
      status: true,
      message: "Categories Created Successfully",
      data: categories,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

//===================== [ Create SubCategories ] =====================/

const CreateSubCategories = async function (req, res) {
  try {
    let data = req.body;
    let { id, subcategories_name } = data;

    let subcategories = await SubCategoriesModel.create(data);
    res.status(201).send({
      status: true,
      message: "SubCategories Created Successfully",
      data: subcategories,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ User Language ] =====================/
const UserLanguage = async function (req, res) {
  try {
    let data = req.body;
    let { id, language_name } = data;

    let Language = await LanguageModel.create(data);
    res.status(201).send({
      status: true,
      message: "Language Selected Successfully",
      data: Language,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

//===================== [ Create Article ] =====================/

const CreateArticle = async function (req, res) {
  try {
    let data = req.body;
    let {
      userId,
      category,
      title,
      sub_heading,
      short_details,
      body,
      image,
      url,
      tags,
      news_priority,
      news_sections,
      change_byline,
      source,
      isApproved,
      isRejected,
      remark,
      author_name,
      schedule_time,
      schedule_date,
      approved_by,
      font,
    } = data;

    let Article = await PostArticleModel.create(data);
    res.status(201).send({
      status: true,
      message: "Article Created Successfully",
      data: Article,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

//===================== [ Update Create Article ] =====================/

// const UpdatePostArticle = async function (req, res) {
//   try {
//     let userId = req.params.userId;
//     let data = req.body;
//     let articleId = req.body._id;

//     let {
//       category,
//       title,
//       sub_heading,
//       short_details,
//       body,
//       image,
//       url,
//       tags,
//       news_priority,
//       news_sections,
//       change_byline,
//       source,
//       isApproved,
//       isRejected,
//       remark,
//       author_name,
//       schedule_time,
//       schedule_date,
//       approved_by,
//       font,
//     } = data;

//     let updatedArticle = await PostArticleModel.findByIdAndUpdate(
//       { _id: articleId, userId: userId },
//       data,
//       { new: true }
//     );

//     return res.status(200).send({
//       status: true,
//       message: "PostArticle Updated Successfully",
//       data: updatedArticle,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       status: false,
//       error: "An error occurred",
//     });
//   }
// }

//===================== [ Media type ] ========================/

const createMediaModel = async function (req, res) {
  try {
    let data = req.body;
    let { id, media_type } = data;

    let Media = await MediaModel.create(data);
    res.status(201).send({
      status: true,
      message: "Media type Created Successfully",
      data: Media,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ Check Box ] =====================/

const CheckBox = async function (req, res) {
  try {
    let data = req.body;
    let { id, checkbox_name } = data;

    let Check_Box = await CheckBoxModel.create(data);
    res.status(201).send({
      status: true,
      message: "CheckBox Model Created Successfully",
      data: Check_Box,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ Select Model ] =====================/

const SelectCategories = async function (req, res) {
  try {
    let data = req.body;
    let { id, select_name } = data;

    let Check_Box = await SelectModel.create(data);
    res.status(201).send({
      status: true,
      message: "SelectCategories Created Successfully",

      data: Check_Box,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ State And Cities ] =====================/

const getState = async (req, res) => {
  try {
    let country = req.body;
    const city = await CountryState.find();

    res
      .status(200)
      .send({ success: true, msg: "State and City data", data: city });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
};

//===================== [ Status Model ] =====================/

const StatusModel = async function (req, res) {
  try {
    let data = req.body;
    let { user_status } = data;

    let Status = await StatusModels.create(data);
    res.status(201).send({
      status: true,
      message: " Status Model Created Successfully",
      data: Status,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//===================== [ Get Post Article Model ] =====================/

const getPostNews = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;
    var allPosts = []
    const getdata = await PostNewsModel.find().lean();
    allPosts = getdata.filter(post => !post.isRejected && !post.isApproved);

    for (let i = 0; i < allPosts.length; i++) {
      const postUserId = allPosts[i].userId;
      console.log(postUserId);

      let user = await SuperAdmin.findById({ _id: postUserId });
      if (user) {
        allPosts[i].username = user.name;
      } else {
        let publication = await VendorModel.findById(postUserId);
        if (publication) {
          allPosts[i].username = publication.publisher_name;
        }
      }

    }

    res.status(200).send({ success: true, msg: "Post News Get Success", data: allPosts });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }

};


//==================== [ Get Post Article for Vendor pending Approval ] ==============/

const getPostNewsVendor = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;
    var allPosts = []
    const getdata = await PostNewsModel.find({ userId }).lean();
    allPosts = getdata.filter(post => !post.isRejected && !post.isApproved);

    for (let i = 0; i < allPosts.length; i++) {
      const postUserId = allPosts[i].userId;
      // console.log(postUserId);

      let user = await SuperAdmin.findById({ _id: postUserId });
      if (user) {
        allPosts[i].username = user.name;
        console.log(user.name);
      } else {
        let publication = await VendorModel.findById(postUserId);
        if (publication) {
          allPosts[i].username = publication.publisher_name;
          // console.log(publication.publisher_name);
        }
      }

    }

    res.status(200).send({
      success: true,
      msg: "Post News Get Success",
      data: allPosts
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: error.message
    });
  }

};

//==================== [ Update Post News ] ======================/

const updatePostNews = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;

    const updatedPost = await PostNewsModel.find({ userId: userId }, data, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).send({ success: false, msg: "Post not found" });
    }
    res.status(200).send({
      success: true,
      msg: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
};


//================== [ Schedule Date/time Update ] =====================/

const updateScheduleDateTime = async (req, res) => {
  const { _id } = req.body;
  const { schedule_time, schedule_date } = req.body;
  try {
    const article = await PostArticleModel.findById(_id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    article.schedule_time = schedule_time;
    article.schedule_date = schedule_date;
    await article.save();
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


//================= [ Add Roles Model ] ====================/ 

const AddRolesModel = async function (req, res) {
  try {
    const userId = req.params.userId;
    const {
      role_name,
      status,
      department,
      designation,
      role,
      main_menu,
      subMenu_level_1,
      subMenu_level_2,
      create_user,
      user_role_custom,
      post_news,
      create_project,
      create_job_task,
      assign_task,
    } = req.body;

    const data = {
      userId,
      role_name,
      status,
      department,
      designation,
      role,
      main_menu,
      subMenu_level_1,
      subMenu_level_2,
      create_user,
      user_role_custom,
      post_news,
      create_project,
      create_job_task,
      assign_task,
    };

    const AddRole = await Addrolesmodel.create(data);

    res.status(201).json({
      status: true,
      message: "Role added successfully",
      data: AddRole,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//================= [ Roll Creations ]========================/

const Roll_CreationModel = async function (req, res) {
  try {
    const userId = req.params.userId;
    let data = req.body;
    let {
      role_name,
      Upload_E_Paper,
      View_E_Paper,
      Publish_E_Paper,
      Edit_E_Paper,
      View_Published_E_Paper,
      Create_New_Post,
      View_Draft_Posts,
      Approve_News,
      Scheduled_News,
      View_Published_News,
      Edit_Published_News,
      Place_New_Ad,
      View_Already_Palaced_Ads,
      Edit_Already_Palaced_Ads,
      News_Paper_Registration,
      View_Registered_News_Papers,
      Edit_Registered_News_Papers,
      Template_Assign,
      Template_Settings_changes_Assigned,
      Template_assigned_view_Current_config,
      Template_assigned_Edit,
      Self_User_Creation,
      Self_User_Edit,
      Self_User_View,
      Self_User_Custom_Rights_assign,
      News_Paper_User_Creation,
      News_Paper_User_Edit,
      News_Paper_User_View,
      News_Paper_User_Custom_Rights_assign,
      Meta_Parameters_for_categories,
      RSS_Feed_Generation,
      Site_Map_Generation,
      Reports,
      Analytics,
      Social_Media,
      Revenue_Input_for_each_partner,
      Final_revenue_after_calculation,
      View_Update,
    } = data;
    data.userId = userId;

    const filteredData = {};
    for (const key in data) {
      if (data[key] === true) {
        filteredData[key] = true;
      }
    }

    if (await RollCreation.findOne({ role_name: role_name }))
      return res.status(400).send({ message: "This Role name already exists" })

    let E_paper = await RollCreation.create(data);

    res.status(201).json({
      status: true,
      message: "Roll Creation added successfully",
      data: E_paper,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//================= [ Get All Rolls] ======================//

const getAllRoles = async function (req, res) {
  try {
    let userId = req.params.userId;

    let getRolls = await RollCreation.find({ userId: userId })
    res.status(200).json({
      status: true,
      message: "Get Rolls successfully",
      data: getRolls,
    });

  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//======================[ get list rolles ]======================//

const getAllroleslist = async function (req, res) {
  try {
    let userId = req.params.userId;

    let getRolls = await RollCreation.find({ userId: userId }).lean();
    console.log(getRolls)
    getRolls = getRolls.map(roll => {
      const filteredRoll = {
        role_name: roll.role_name,
      };
      for (const key in roll) {
        if (key !== '_id' && key !== 'userId' && roll[key] === true) {
          filteredRoll[key] = true;
        }
      }
      return filteredRoll;
    });

    res.status(200).json({
      status: true,
      message: "Get Rolls successfully",
      data: getRolls,
    });

  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//======================[ Role base Login ]==========================//

const RollbaseLogin = async function (req, res) {
  try {
    let data = req.body;
    let userId = req.params.userId;
    let role_name = req.query.role_name;
    let { email, password } = data;

    let userExists = await UserRoleModel.findOne({ _id: userId, email: email });

    if (!userExists) {
      return res.status(400).send({
        status: false,
        msg: "Email and Password is Invalid",
      });
    }

    let compared = await bcrypt.compare(password, userExists.password);
    if (!compared) {
      return res.status(400).send({
        status: false,
        message: "Your password is invalid",
      });
    }

    var token = jwt.sign(
      {
        userId: userExists._id,
      },
      "project"
    );

    let updateToken = await UserRoleModel.findByIdAndUpdate(
      { _id: userExists._id },
      { token },
      { new: true }
    );
    userExists.token = updateToken.token;
    let getRolls = await RollCreation.find({ userId: userId, role_name: role_name }).lean();
    getRolls = getRolls.map(roll => {
      const filteredRoll = {
        role_name: roll.role_name,
      };
      for (const key in roll) {
        if (key !== '_id' && key !== 'userId' && roll[key] === true) {
          filteredRoll[key] = true;
        }
      }
      return filteredRoll;
    });

    return res.status(200).json({
      status: true,
      msg: "News Paper Agency Login and Get Rolls successfully",
      data: {
        user: userExists,
        role: getRolls,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};


//======================[ update Role base ]==========================//

const updateRollBase = async function (req, res) {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    const updatedRole = await RollCreation.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedRole) {
      return res.status(404).send({ message: "Role not found" });
    }

    res.status(200).json({
      status: true,
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

//======================[ delete Role base ]==========================//

const deleteRollBase = async function (req, res) {
  try {
    const userId = req.params.userId;

    const deletedRole = await RollCreation.findByIdAndDelete(userId);

    if (!deletedRole) {
      return res.status(404).send({ message: "Role not found" });
    }

    res.status(200).json({
      status: true,
      message: "Role deleted successfully",
      data: deletedRole,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//**************************[ Master Part ]***********************/


//================= [ Master Categories ] ==================/

const MasterCategories = async function (req, res) {
  try {
    let data = req.body;
    let { categories_Name_Hindi, categories_Name_English, categories_Name_Url } = data;

    const existingCategory = await masterCategories.findOne({ categories_Name_Url });

    if (existingCategory) {
      return res.status(400).json({
        status: false,
        message: "URL already exists",
      });
    }

    const mastercategories = await masterCategories.create(data);

    return res.status(201).json({
      status: true,
      message: "categories created successfully",
      data: [mastercategories],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "This Field is required",
    });
  }
};

//=================== [ Get Categories with Id ]================/

const GetMasterCategoryById = async function (req, res) {
  try {
    const userId = req.params.userId;
    const masterCategory = await masterCategories.findById({ _id: userId });

    if (!masterCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category retrieved successfully",
      data: masterCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while retrieving the category",
    });
  }
};

//================= [ Update Master Categories ] ==================/

const UpdateMasterCategory = async function (req, res) {
  try {
    let userId = req.params.userId;
    const { categories_Name_Hindi, categories_Name_English, categories_Name_Url } = req.body;
    const updatedCategory = await masterCategories.findOneAndUpdate(
      { _id: userId },
      { $set: { categories_Name_Hindi, categories_Name_English, categories_Name_Url } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: [updatedCategory],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//===================[ Delete Master Categories ]===================/

const DeleteMasterCategory = async function (req, res) {
  try {
    const userId = req.params.userId;
    const deletedCategory = await masterCategories.findByIdAndDelete({ _id: userId });

    if (!deletedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: [deletedCategory],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//=================== [ One Parameter Master Categories ] ==================/

const Mastercategories = async function (req, res) {
  try {
    let data = req.body;
    let { categories_Name_English } = data;

    const mastercategories = await masterCategories.create(data);
    console.log(mastercategories)

    return res.status(201).json({
      status: true,
      message: "categories created successfully",
      data: [mastercategories],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//================= [ Master Tag ] ===================/

const MasterTag = async function (req, res) {
  try {
    let data = req.body;
    let { tag_name } = data;

    const mastertag = await masterTag.create(data);
    return res.status(201).json({
      status: true,
      message: "Tag created successfully",
      data: mastertag,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "This Field is required",
    });
  }
};

//================= [ Update Master Tag ] ===================/

const UpdateTag = async function (req, res) {
  try {
    let userId = req.params.id;
    const { tag_name } = req.body;

    const updatedTag = await masterTag.findOneAndUpdate(
      { userId },
      { $set: { tag_name } },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({
        status: false,
        message: "Tag not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tag updated successfully",
      data: updatedTag,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//================= [ Delete Master Tag ] ===================/

const DeleteTag = async function (req, res) {
  try {
    let userId = req.params.userId;

    const deletedTag = await masterTag.findByIdAndDelete({ _id: userId });

    if (!deletedTag) {
      return res.status(404).json({
        status: false,
        message: "Tag not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tag deleted successfully",
      data: deletedTag,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//================= [ Master Location ] ===================/


//================= [ Get Master Categories ] ============/

const GetMasterCategories = async function (req, res) {
  try {
    const userId = req.params.userId;
    const allMasterCategories = await masterCategories.find();

    return res.status(200).json({
      status: true,
      message: "Master categories retrieved successfully",
      data: allMasterCategories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//================= [ Get Master Tag ] ================/

const GetMasterTag = async function (req, res) {
  try {
    const userId = req.params.userId;
    const allMasterTag = await masterTag.findById(userId);

    return res.status(200).json({
      status: true,
      message: "Master Tag retrieved successfully",
      data: allMasterTag,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};



module.exports = {
  createUser,
  userLogin,
  NewsPaperAgencyLogin,
  getPostNews,
  updatePostNews,
  CreatePlateform,
  CreateCategories,
  CreateSubCategories,
  UserLanguage,
  CreateArticle,
  createMediaModel,
  CheckBox,
  SelectCategories,
  getState,
  StatusModel,
  updateScheduleDateTime,
  AddRolesModel,
  // UpdatePostArticle,
  getPostNewsVendor,
  RollbaseLogin,
  Roll_CreationModel,
  getAllRoles,
  getAllroleslist,
  updateRollBase,
  deleteRollBase,
  MasterCategories,
  Mastercategories,
  GetMasterCategoryById,
  MasterTag,
  GetMasterCategories,
  GetMasterTag,
  UpdateMasterCategory,
  DeleteMasterCategory,
  UpdateTag,
  DeleteTag,

};
