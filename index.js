const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./src/Routes/route");
const Middleware = require("./src/Middleware/auth");
const UserRoleModel = require("./src/Models/User_RoleModel");
const PostArticleModel = require("./src/Models/PostArticleModel");
const VendorModel = require("./src/Models/VendorModel");
const Addrolesmodel = require("./src/Models/Add_RolesModel");
const SuperAdmin = require("./src/Models/SuperAdmin");
const DraftModel = require("./src/Models/DraftModel");
const StateModel = require("./src/Models/StateModel");
const masterCategories = require("./src/Models/MasterCategories");
const CreateAdvertisement = require("./src/Models/CreateAdvertisement");
const VendorPageNameLocation = require("./src/Models/VendorPageModel");
const Templates = require("./src/Models/templates");
const Epaper = require("./src/Models/EpaperModel");


const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

//===================== [ Multer Storage ] =================================/

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === 'image') {
//       cb(null, './uploads/image');
//     } else if (file.fieldname === 'pdf') {
//       cb(null, './uploads/pdf');
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   },
// });


// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5000000000,
//   },
// });

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/image');
  },
  filename: (req, file, cb) => {
    cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);
  },
});


const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5000000000,
  },
});


//====================== [ Create Post news ] =================================/

app.use("/image", express.static("./uploads/image"))
app.post(
  "/:userId/post-news",
  Middleware.jwtValidation,
  Middleware.authorization,
  imageUpload.single("image"),
  async (req, res) => {
    try {
      let data = req.body;
      let userId = req.params.userId;
      let file = req.file;
      let {
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
        x_min,
        y_min,
        x_max,
        y_max,
        page_number,
        pdf_name,
        date,
      } = data;

      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      let PostArticle = await PostArticleModel.create(data);
      res.status(201).send({
        status: true,
        message: "Post News Created Successfully",
        data: PostArticle,
      });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

//======================[ Get post news with Id ]=========================/

app.get("/:_id/get-post-news", async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;
    let file = req.file;
    const _id = req.params._id;
    const post = await PostArticleModel.findById({ _id: _id }).lean();

    if (!post) {
      return res.status(404).send({ status: false, message: "Post not found" });
    }

    data.userId = userId;
    if (file) {
      data.image = `/image/${file.filename}`;
    }
    res.status(200).send({ status: true, data: post });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ Get Post Article Category Wise] =======================/

app.get("/:userId/get-Postnews/:category", async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;
    let file = req.file;
    const category = req.params.category;
    const articles = await PostArticleModel.find({ userId, category });
    console.log(articles)
    for (let i = 0; i < articles.length; i++) {
      var schedule_date = articles[i].schedule_date;
      var schedule_time = articles[i].schedule_time;
    }
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = (date.getHours() % 12).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`
    const currentTime = `${hours}:${minutes}`;

    console.log(currentDate, "bbbb")
    console.log(currentTime, "aaaa")

    data.userId = userId;
    if (file) {
      data.image = `/image/${file.filename}`;
    }

    if (schedule_date == currentDate || schedule_time == currentTime) {
      var approvedArticles = articles.filter(article => article.isApproved === true);
    }

    res.status(200).send({
      status: true,
      message: `News Articles with category '${category}' retrieved successfully`,
      data: approvedArticles,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ Create Draft news ] ==================================/

app.post(
  "/:userId/draft-article",
  Middleware.jwtValidation,
  Middleware.authorization,
  imageUpload.single("image"),
  async (req, res) => {
    try {
      let data = req.body;
      let userId = req.params.userId;
      let file = req.file;
      let {
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
        x_min,
        y_min,
        x_max,
        y_max,
        page_number,
        pdf_name,
        date,
      } = data;

      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      let PostArticle = await DraftModel.create(data);
      res.status(201).send({
        status: true,
        message: "Draft Created Successfully",
        data: PostArticle,
      });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

//===================== [ Draft Get Article ] =========================/

app.get("/:userId/get-draft-articles", async (req, res) => {
  try {
    let userId = req.params.userId;
    let file = req.file;
    let draftArticles = null

    if (await SuperAdmin.find({ userId })) {
      draftArticles = await DraftModel.find({ isRejected: false });
    } else if (await VendorModel.find({ userId })) {
      draftArticles = await DraftModel.find({ isRejected: false });
    }

    draftArticles = draftArticles.map(article => {
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      article.userId = userId;
      return article;
    });

    res.status(200).send({
      status: true,
      message: "Draft Articles Retrieved Successfully",
      data: draftArticles,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ Get Draft Article for Vendor ] =================/

app.get("/:userId/get-draft-articles-vendor", async (req, res) => {
  try {
    let userId = req.params.userId;
    let file = req.file;
    let draftArticles = null

    if (await VendorModel.find({ userId })) {
      draftArticles = await DraftModel.find({ userId });
    }

    draftArticles = draftArticles.map(article => {
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      article.userId = userId;
      return article;
    });

    res.status(200).send({
      status: true,
      message: "Draft Articles Retrieved Successfully",
      data: draftArticles,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//===================== [ Draft Delete Article ] =======================/

app.delete("/draft-article", async (req, res) => {
  try {
    let userId = req.body._id;

    let deletedArticle = await DraftModel.findByIdAndDelete(userId);

    if (!deletedArticle) {
      return res.status(404).send({ status: false, message: "Draft article not found" });
    }

    res.status(200).send({ status: true, message: "Draft article deleted successfully", data: deletedArticle });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//====================== [ Create User Role ] ==========================/

app.post("/user-role", imageUpload.single("user_image"), async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;
    let {
      user_name,
      first_name,
      middle_name,
      last_name,
      department,
      user_role,
      user_superior,
      byline,
      display_name,
      password,
      pin_code,
      address,
      state,
      city,
      mobile_1,
      mobile_2,
      email_1,
      email_2,
      user_image,
      user_BIO,
      social_facebook,
      social_twitter,
      social_linkedin,
      social_instagram,
    } = data;

    if (await UserRoleModel.findOne({ mobile_1: mobile_1 }))
      return res
        .status(400)
        .send({ status: false, message: "Mobile_1 already exist" });

    if (await UserRoleModel.findOne({ email_1: email_1 }))
      return res
        .status(400)
        .send({ status: false, message: "Email_1 already exist" });

    if (await UserRoleModel.findOne({ mobile_2: mobile_2 }))
      return res
        .status(400)
        .send({ status: false, message: "Mobile_2 already exist" });

    if (await UserRoleModel.findOne({ email_2: email_2 }))
      return res
        .status(400)
        .send({ status: false, message: "Email_2 already exist" });

    const encryptedPassword = bcrypt.hashSync(password, 12);
    req.body["password"] = encryptedPassword;

    var token = jwt.sign(
      {
        userId: UserRoleModel._id,
      },
      "project"
    );
    data.token = token;
    if (file) {
      data.user_image = `/image/${file.filename}`;
    }

    let savedData = await UserRoleModel.create(data);
    res.status(201).send({
      status: true,
      msg: "User Role Model Register successfull",
      data: {
        user_name: savedData.user_name,
        password: savedData.password,
        first_name: savedData.first_name,
        middle_name: savedData.middle_name,
        last_name: savedData.last_name,
        department: savedData.department,
        user_role: savedData.user_role,
        user_superior: savedData.user_superior,
        byline: savedData.byline,
        display_name: savedData.display_name,
        pin_code: savedData.pin_code,
        address: savedData.address,
        state: savedData.state,
        city: savedData.city,
        mobile_1: savedData.mobile_1,
        mobile_2: savedData.mobile_2,
        email_1: savedData.email_1,
        email_2: savedData.email_2,
        user_image: savedData.user_image,
        user_BIO: savedData.user_BIO,
        social_facebook: savedData.social_facebook,
        social_twitter: savedData.social_twitter,
        social_linkedin: savedData.social_linkedin,
        social_instagram: savedData.social_instagram,
        token: savedData.token,
      },
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//===================== [ Create Vendor/Publication Details ] ================/

app.use("/image", express.static("./uploads/image"))
app.post(
  "/publication-details",
  imageUpload.fields([
    { name: "logo_large", maxCount: 1 },
    { name: "logo_small", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let data = req.body;
      let file = req.files;
      let {
        publisher_name,
        type_of_Entity,
        mobile,
        email,
        password,
        owner_key,
        publisher_BIO,
        account_manager,
        status_user,
        status_publication,
        Revenue_Share,
        Agreement_Start_Date,
        Agreement_End_Date,
        Auto_Renewal,
        Refferal_by,
        PAN_No,
        GST_No,
        Bank_acc_No,
        Bank_name,
        Branch_name,
        IFSC_code,
        pub_social_facebook,
        pub_social_twitter,
        pub_social_linkedin,
        pub_social_instagram,
        pub_social_youtube,
        domain_name,
        logo_large,
        logo_small,
        site_display_contact,
        publisher_site_mobile,
        publisher_site_email,
        regd_address,
        regd_state_city,
        regd_pin_code,
        comm_address,
        comm_state_city,
        comm_pin_code,
        tech_name,
        tech_mobile,
        tech_email,
        finance_name,
        finance_mobile,
        finance_email,
        sales_name,
        sales_mobile,
        sales_email,
        editorial_name,
        editorial_mobile,
        editorial_email,
        publication_name,
        Lang_of_Publication,
        city_of_publication,
        frequency_of_publication,
        circulation,
        RNI_No,
        RNI_Regn_date,
        approved_by,
        templates,
      } = data;
      if (await VendorModel.findOne({ email: email }))
        return res
          .status(400)
          .send({ status: false, message: "Email already exist" });

      const encryptedPassword = bcrypt.hashSync(password, 12);
      req.body["password"] = encryptedPassword;

      var token = jwt.sign(
        {
          userId: VendorModel._id,
        },
        "project"
      );
      data.token = token;

      if (file) {
        (data.logo_large = `/image/${file.logo_large[0].filename}`),
          (data.logo_small = `/image/${file.logo_small[0].filename}`);
      }
      let PublicationDetails = await VendorModel.create(data);
      res.status(201).send({
        status: true,
        message: "Publication Details Created Successfully",
        data: PublicationDetails,
      });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

//===================== [ Update Publication Details ] ================/

app.put("/:userId/update_publication", imageUpload.fields([
  { name: "logo_large", maxCount: 5 },
  { name: "logo_small", maxCount: 5 },
]), async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const files = req.files;

    const existingPublication = await VendorModel.findById(userId);

    if (!existingPublication) {
      return res
        .status(404)
        .send({ status: false, message: "User not found" });
    }

    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        existingPublication[key] = newData[key];
      }
    }

    if (files) {
      if (files.logo_large) {
        existingPublication.logo_large = `/image/${files.logo_large[0].filename}`;
      }
      if (files.logo_small) {
        existingPublication.logo_small = `/image/${files.logo_small[0].filename}`;
      }
    }
    const updatedPublication = await existingPublication.save();

    const safePublicationDetails = { ...updatedPublication._doc };
    safePublicationDetails.password = '';

    res.status(200).send({
      status: true,
      message: "Publication Details Updated Successfully",
      data: [safePublicationDetails],
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//======================= [ Get Publication Details ] =================/

app.get("/:userId/get-publication-details", async (req, res) => {
  try {
    const userId = req.params.userId;
    const file = req.file;

    const publicationDetails = await VendorModel.findOne({ _id: userId });

    if (file) {
      data.logo_large = `/image/${file.logo_large[0].filename}`;
      data.logo_small = `/image/${file.logo_small[0].filename}`;
    }

    const safePublicationDetails = { ...publicationDetails._doc };
    safePublicationDetails.password = '';

    res.status(200).send({
      status: true,
      message: "Publication Details Retrieved Successfully",
      data: [safePublicationDetails],
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//===================== [ Approve and Update ] =====================/

app.put("/:userId/ApprovalupdateNews", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    let postNewsId = req.body._id;
    let userId = req.params.userId;
    let schedule_time = req.body.schedule_time;
    let schedule_date = req.body.schedule_date;

    let News = await PostArticleModel.findById({ _id: postNewsId });

    let user = await SuperAdmin.findById({ _id: userId }).lean();
    if (user) {
      News.approved_by = user.name;
    } else {
      let publication = await VendorModel.findById({ _id: userId }).lean();
      if (publication) {
        News.approved_by = publication.publisher_name;
      }
    }

    if (News.isApproved == false) {
      var updateNews = await PostArticleModel.findByIdAndUpdate(
        { _id: postNewsId },
        { $set: { isApproved: true, schedule_time: schedule_time, schedule_date: schedule_date } },
        { new: true }
      );
    }

    return res.status(200).send({
      status: true,
      message: "Post Update Successfully",
      isApproved: updateNews.isApproved
    })

  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }

})

app.get("/:userId/getApproval", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    var data = req.body;
    var userId = req.params.userId;

    const response = await PostArticleModel.find().lean();

    if (response.length > 0) {
      const approvedPosts = response.filter((post) => post.isApproved && !post.isRejected);

      if (approvedPosts.length > 0) {
        for (let i = 0; i < approvedPosts.length; i++) {
          const postUserId = approvedPosts[i].userId;

          let user = await SuperAdmin.findById({ _id: postUserId }).lean();
          if (user) {
            approvedPosts[i].username = user.name;
          } else {
            let publication = await VendorModel.findById({ _id: postUserId }).lean();
            if (publication) {
              approvedPosts[i].username = publication.publisher_name;
            }
          }

        }

        res.status(200).send({
          status: true,
          message: "Get Post News Successfully",
          data: approvedPosts,
        });
      } else {
        res.status(200).send({
          status: true,
          message: "No approved post news found for the user.",
          data: [],
        });
      }
    } else {
      res.status(200).send({
        status: true,
        message: "No post news found for the user.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving post news.",
      error: error.message,
    });
  }
});

app.get("/:userId/getApprovalVendor", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    var data = req.body;
    var userId = req.params.userId;

    const response = await PostArticleModel.find({ userId }).lean();

    if (response.length > 0) {
      const approvedPosts = response.filter((post) => post.isApproved && !post.isRejected);

      if (approvedPosts.length > 0) {
        for (let i = 0; i < approvedPosts.length; i++) {
          const postUserId = approvedPosts[i].userId;

          let user = await SuperAdmin.findById({ _id: postUserId }).lean();
          if (user) {
            approvedPosts[i].username = user.name;
          } else {
            let publication = await VendorModel.findById({ _id: postUserId }).lean();
            if (publication) {
              approvedPosts[i].username = publication.publisher_name;
            }
          }

        }

        res.status(200).send({
          status: true,
          message: "Get Post News Successfully",
          data: approvedPosts,
        });
      } else {
        res.status(200).send({
          status: true,
          message: "No approved post news found for the user.",
          data: [],
        });
      }
    } else {
      res.status(200).send({
        status: true,
        message: "No post news found for the user.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving post news.",
      error: error.message,
    });
  }
});

//===================== [ Reject And Update ] =====================/

app.put("/:userId/RejectUpdateNews", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    let postNewsId = req.body._id;
    let data = req.body.remark;

    if (await PostArticleModel.findById({ _id: postNewsId })) {
      let News = await PostArticleModel.findById({ _id: postNewsId });

      if (News.isRejected == false) {
        var updateNews = await PostArticleModel.findByIdAndUpdate(
          { _id: postNewsId },
          { $set: { isRejected: true, remark: data } },
          { new: true }
        );
      }
    } else {
      let News = await DraftModel.findById({ _id: postNewsId });
      if (News.isRejected == false) {
        var updateNews = await DraftModel.findByIdAndUpdate(
          { _id: postNewsId },
          { $set: { isRejected: true, remark: data } },
          { new: true }
        );
      }
    }
    return res.status(200).send({
      status: true,
      message: "Post Update Successfully",
      isRejected: updateNews.isRejected,
      remark: updateNews.remark
    })

  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
})

app.get("/:userId/getRejected", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;

    const response = await PostArticleModel.find().lean();

    if (response.length > 0) {
      const rejectedPosts = response.filter((post) => post.isRejected && !post.isApproved);

      if (rejectedPosts.length > 0) {
        for (let i = 0; i < rejectedPosts.length; i++) {
          const postUserId = rejectedPosts[i].userId;
          let user = await SuperAdmin.findById({ _id: postUserId }).lean();
          if (user) {
            rejectedPosts[i].username = user.name;
          } else {
            let publication = await VendorModel.findById({ _id: postUserId }).lean();
            if (publication) {
              rejectedPosts[i].username = publication.publisher_name;
              // console.log(publication.publisher_name);
            }
          }
        }

        res.status(200).send({
          status: true,
          message: "Get Post News Successfully",
          data: rejectedPosts,
        });
      } else {
        res.status(200).send({
          status: true,
          message: "No rejected post news found for the user.",
          data: [],
        });
      }
    } else {
      res.status(200).send({
        status: true,
        message: "No post news found for the user.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving post news.",
      error: error.message,
    });
  }
});

app.get("/:userId/getRejectedVendor", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;

    const response = await PostArticleModel.find({ userId }).lean();

    if (response.length > 0) {
      const rejectedPosts = response.filter((post) => post.isRejected && !post.isApproved);

      if (rejectedPosts.length > 0) {
        for (let i = 0; i < rejectedPosts.length; i++) {
          const postUserId = rejectedPosts[i].userId;
          let user = await SuperAdmin.findById({ _id: postUserId }).lean();
          if (user) {
            rejectedPosts[i].username = user.name;
          } else {
            let publication = await VendorModel.findById({ _id: postUserId }).lean();
            if (publication) {
              rejectedPosts[i].username = publication.publisher_name;
            }
          }
        }

        res.status(200).send({
          status: true,
          message: "Get Post News Successfully",
          data: rejectedPosts,
        });
      } else {
        res.status(200).send({
          status: true,
          message: "No rejected post news found for the user.",
          data: [],
        });
      }
    } else {
      res.status(200).send({
        status: true,
        message: "No post news found for the user.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving post news.",
      error: error.message,
    });
  }
});


//===================== [ Get Add Roles ] =======================/

app.get("/:userId/getAddRoles", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.body;
    let News = await Addrolesmodel.find({ userId: userId });
    return res.status(200).send({
      status: true,
      message: "Get Add Roles Successfully",
      data: News,
    })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
})

//===================== [ Get Add Roles Update ] ================/

// app.put("/:userId/updateAddRoles", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
//   try {
//     let userId = req.params.userId;
//     let _id = req.body._id;
//     let updatedRoleData = req.body;

//     const updatedRole = await Addrolesmodel.findByIdAndUpdate(
//       _id,
//       updatedRoleData,
//       { new: true }
//     );
//     return res.status(200).send({
//       status: true,
//       message: "Update Add Roles Successfully",
//       data: updatedRole,
//     });
//   } catch (err) {
//     res.status(500).send({ status: false, error: err.message });
//   }
// });


app.put("/:userId/updateAddRoles", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    let userId = req.params.userId;
    let _id = req.body._id;

    // Retrieve existing role data from the database
    const existingRole = await Addrolesmodel.findByIdAndUpdate(_id);
    if (!existingRole) {
      return res.status(404).send({
        status: false,
        message: "Role not found",
      });
    }

    // Merge existing role data with updated role data
    let updatedRoleData = {
      ...existingRole.toObject(),  // Convert to plain JavaScript object
      ...req.body,  // Update fields provided in the request body
      _id,  // Retain the existing _id
    };

    // Perform the update with the merged data
    const updatedRole = await Addrolesmodel.findByIdAndUpdate(
      _id,
      updatedRoleData,
      { new: true }
    );

    return res.status(200).send({
      status: true,
      message: "Update Add Roles Successfully",
      data: updatedRole,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


app.put("/:userId/updateAddRoles", async (req, res) => {
  const roleId = req.params.id;
  const updateFields = req.body;

  try {
    const role = await Addrolesmodel.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Update the fields with true values
    for (const key in updateFields) {
      if (role[key] && Array.isArray(role[key])) {
        const updatedArray = role[key].map((value, index) =>
          updateFields[key][index] ? true : value
        );
        role[key] = updatedArray;
      }
    }

    const updatedRole = await role.save();
    res.json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "An error occurred while updating the role" });
  }
});

//===================== [ Get All Vendor List ]==================/

app.get("/VendorList", async (req, res) => {
  try {
    const publications = await VendorModel.find();
    res.json(publications);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "error " });
  }
});

//===================== [ delete Vendor ]==================/
app.delete("/:userId/deleteVendor", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)

  try {
    const deletedVendor = await VendorModel.findByIdAndDelete({ _id: userId });

    if (!deletedVendor) {
      return res.status(404).json({ error: "Vendor not found." });
    }

    res.json({
      message: "Vendor deleted successfully.",
      data: deletedVendor,
    });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({
      error: "An error occurred while deleting the vendor.",
      message: error,
    });
  }
});

//===================== [ Get All Vendor List ]==================/

app.get("/UserRoleList", async (req, res) => {
  try {
    const userRoles = await UserRoleModel.find();
    res.json(userRoles);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//===================== [ delete User Role ]===============/
app.delete("/:userId/deleteUserRole", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUserRole = await UserRoleModel.findByIdAndDelete({ _id: userId });

    if (!deletedUserRole) {
      return res.status(404).json({ error: "User role not found." });
    }

    res.json({
      message: "User role deleted successfully.",
      data: deletedUserRole
    });
  } catch (error) {
    console.error("Error deleting user role:", error);
    res.status(500).json({
      error: "An error occurred while deleting the user role.",
      message: errror,
    });
  }
});

//===================== [ Get All Vendor List with fields ]==================/

app.get("/UserRoleListfield", async (req, res) => {
  try {
    const userRoles = await UserRoleModel.find().select({
      'user_name': 1,
      'first_name': 1,
      'middle_name': 1,
      'last_name': 1,
      'department': 1,
      'user_role': 1,
      'email_1': 1,
      'mobile_1': 1,
      'address': 1,
    }).exec();
    res.json(userRoles);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//===================== [ update All Vendor List fields ]==================/

app.put("/updateUserRolelist/:id", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const userRole = await UserRoleModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!userRole) {
      return res.status(404).json({ error: "User role not found" });
    }

    res.json(userRole);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "An error occurred while updating user role" });
  }
});


//=============== [ Get Approved News latest Breaking News ]===========/ 

app.get("/:userId/getBreakingNews", async (req, res) => {
  try {
    var userId = req.params.userId;
    const response = await PostArticleModel.find({ userId: userId, isApproved: true, isRejected: false, news_priority: "Breaking" })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.status(200).send({
      status: true,
      message: "Get Breaking News Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving breaking news.",
      error: error.message,
    });
  }
});

//=====================[ Get Categories List ]======================/

app.get("/categories", async (req, res) => {
  try {
    const categoriesEnglishList = await masterCategories.find({}, 'categories_Name_English');
    const categoryNamesEnglish = categoriesEnglishList.map(item => item.categories_Name_English);

    return res.json({
      status: true,
      message: 'Category names retrieved successfully',
      data: categoryNamesEnglish,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
});

//=====================[ delete Categories ]======================/

app.delete("/:userId/deletecategories", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedCategory = await masterCategories.findByIdAndDelete({ _id: userId });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json({
      status: true,
      message: "Category deleted successfully.",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while deleting the category.",
    });
  }
});


//=====================[ Update Categories in vendor ]===============/

app.patch('/update-categories/:id', async (req, res) => {
  const publicationId = req.params.id;
  const newCategories = req.body.categories;

  try {
    const publication = await VendorModel.findByIdAndUpdate(
      publicationId,
      { $set: { categories: newCategories } },
      { new: true }
    );

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    return res.status(200).json({ message: 'Categories updated successfully', publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//================ [ Create Advertisement ]================//

app.use("/image", express.static("./uploads/image"))
app.post(
  "/:userId/create-advertisement",
  imageUpload.single("image"),
  async (req, res) => {
    try {
      let data = req.body;
      let userId = req.params.userId;
      let file = req.file;
      let {
        page_name,
        page_location,
        desktop,
        start_date,
        end_date,
        script,
        text,
        type_of_ad,
      } = data;

      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      let createdAdvertisement = await CreateAdvertisement.create(data);
      res.status(201).send({
        status: true,
        message: "Post News Created Successfully",
        data: createdAdvertisement,
      });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

//========================[ Get Advertisement ]====================/

app.get("/:userId/:page_name/:page_location/get-Advertisement", async (req, res) => {
  try {
    let page_name = req.params.page_name;
    let page_location = req.params.page_location;
    let data = req.body;
    let userId = req.params.userId;
    let file = req.file;
    const post = await CreateAdvertisement.find({ userId: userId, page_name: page_name, page_location: page_location })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();

    if (!post) {
      return res.status(404).send({ status: false, message: "Post not found" });
    }

    data.userId = userId;
    if (file) {
      data.image = `/image/${file.filename}`;
    }

    res.status(200).send({ status: true, data: post });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//=======================[ vendor post pageName & pageLocation ]========

app.post("/:userId/vendorPageNameLocations", async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.body;
    const { page_name, page_location } = data;


    const existingAdvertisement = await VendorPageNameLocation.findOne({ userId });

    if (existingAdvertisement) {
      return res.status(409).send({
        status: false,
        message: "Vendor Permission Allready set ",
      });
    }

    const vendorPageNameLocation = await VendorPageNameLocation.create({ userId: userId, page_name: page_name, page_location: page_location });

    return res.status(201).json({
      status: true,
      message: "Vendor Page Name Location created successfully",
      data: vendorPageNameLocation,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//=======================[ Get vendor post pageName & pageLocation ]========

app.get("/:userId/getvendorPageNameLocations", async (req, res) => {
  try {
    const userId = req.params.userId;
    const vendorPageNameLocations = await VendorPageNameLocation.find({ userId });

    return res.status(200).json({
      status: true,
      message: "Vendor Page Name Locations retrieved successfully",
      data: vendorPageNameLocations,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//====================== [ list of advertisement Id ]=====================/

app.get("/:userId/listadvertisements", async (req, res) => {
  try {
    const userId = req.params.userId;
    const advertisements = await CreateAdvertisement.find({ userId }); // Assuming your model name is CreateAdvertisement

    res.status(200).send({
      status: true,
      message: "Advertisements retrieved successfully",
      data: advertisements,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ update list of advertisement Id ]=====================/

app.put("/:userId/update-advertisements", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dataToUpdate = req.body;

    const updatedAdvertisement = await CreateAdvertisement.findByIdAndUpdate(
      { _id: userId },
      dataToUpdate,
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).send({
        status: false,
        message: "Advertisement not found ",
      });
    }

    res.status(200).send({
      status: true,
      message: "Advertisement updated successfully",
      data: updatedAdvertisement,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//====================== [ delete list of advertisement Id ]=====================/

app.delete("/:userId/delete-advertisements", async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedAdvertisement = await CreateAdvertisement.findByIdAndDelete({
      _id: userId,
    });

    if (!deletedAdvertisement) {
      return res.status(404).send({
        status: false,
        message: "Advertisement not found or unauthorized",
      });
    }

    res.status(200).send({
      status: true,
      message: "Advertisement deleted successfully",
      data: deletedAdvertisement,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ searching vendor ]==========================/
app.get('/vendorModels', async (req, res) => {
  const publisher_name = req.query.publisher_name;
  if (!publisher_name) {
    return res.status(400).json({ error: 'Please Provide a Parameter' });
  }

  try {
    const filteredVendorModels = await VendorModel.find({
      publisher_name: { $regex: new RegExp(publisher_name, 'i') }, // Case-insensitive match
    });

    res.json(filteredVendorModels);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


//====================== [ Templates ]================================/
app.use('/image', express.static('./uploads/image'));
app.post('/templates', imageUpload.single('image'), async (req, res) => {
  try {
    const { template_name, template_ip } = req.body;

    const template = new Templates({
      image: req.file ? `/image/${req.file.filename}` : undefined,
      template_name,
      template_ip,
    });

    await template.save();

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create template',
      error: error.message
    });
  }
});


//====================== [ Get Template ]===========================/

app.get('/gettemplates', async (req, res) => {
  try {
    const templates = await Templates.find();

    res.status(200).json({
      success: true,
      templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates',
      error: error.message
    });
  }
});


//====================== [ Epaper ]================================/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "./uploads/image");
    } else if (file.fieldname === "pdf") {
      cb(null, "./uploads/pdf");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000000,
  },
});


// app.use('/image', express.static('./uploads/image'));
app.use('/pdf', express.static('./uploads/pdf'));

app.post('/:userId/Epaper',
  upload.fields([
    { name: "pdf", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { category, city, date, pdf_name, image } = req.body;
      const userId = req.params.userId;

      const Epapers = new Epaper({
        image,
        pdf: req.files['pdf'] ? `/pdf/${req.files['pdf'][0].filename}` : undefined,
        category,
        city,
        date,
        userId,
        pdf_name,
      });

      await Epapers.save();

      res.status(201).json({
        success: true,
        message: 'Epaper created successfully',
        Epapers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create Epaper',
        error: error.message
      });
    }
  }
);

//====================== [ Get Epaper ]==============================/
app.get('/:userId/Epapers', async (req, res) => {
  try {
    const userId = req.params.userId;

    const epapers = await Epaper.find({ userId });

    if (!epapers) {
      return res.status(404).json({
        success: false,
        message: 'No Epapers found for the specified user.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Epapers retrieved successfully',
      epapers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Epapers',
      error: error.message,
    });
  }
});



module.exports = router;

//===================== [ Database Connection ] ==================/

mongoose
  .connect(
    "mongodb+srv://Newspaper:Li6BnjEH2cYgkQNc@cluster0.j5zzyto.mongodb.net/"
  )
  .then(() => console.log("Database is connected successfully.."))
  .catch((Err) => console.log(Err));

app.use("/", router);

app.listen(port, function () {
  console.log(`Server is connected on Port ${port} ✅✅✅`);
});

// Li6BnjEH2cYgkQNc
//mongodb+srv://Newspaper:Li6BnjEH2cYgkQNc@cluster0.j5zzyto.mongodb.net/
