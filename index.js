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
<<<<<<< HEAD
const RollCreation = require("./src/Models/Roll_CreationModel");
=======
const Addrolesmodel = require("./src/Models/Add_RolesModel");
>>>>>>> origin/main
const SuperAdmin = require("./src/Models/SuperAdmin");
const DraftModel = require("./src/Models/DraftModel");
const StateModel = require("./src/Models/StateModel");
const masterCategories = require("./src/Models/MasterCategories");
const CreateAdvertisement = require("./src/Models/CreateAdvertisement");
const VendorPageNameLocation = require("./src/Models/VendorPageModel");
const Templates = require("./src/Models/templates");
const Epaper = require("./src/Models/EpaperModel");
<<<<<<< HEAD
const AdvertisementSetting = require("./src/Models/AdvertisementSetting");
const LocationModel = require("./src/Models/StateModel");
const MasterCategories = require("./src/Models/MasterCategories");
const MasterTag = require("./src/Models/MasterTagModel");
const templates = require("./src/Models/templates");
=======

>>>>>>> origin/main

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
<<<<<<< HEAD
        manual_tag,
=======
>>>>>>> origin/main
        font,
        x_min,
        y_min,
        x_max,
        y_max,
        page_number,
        pdf_name,
        date,
      } = data;
<<<<<<< HEAD
      data.createdAt = new Date().toISOString();
=======

>>>>>>> origin/main
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

<<<<<<< HEAD
//======================[ update post Article ]========================/
app.put(
  "/UpdateArticle",
  imageUpload.single("image"),
  async (req, res) => {
    try {
      let userId = req.params.userId;
      let data = req.body;
      let articleId = req.body._id;

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
      } = data;

      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      let updatedArticle = await PostArticleModel.findByIdAndUpdate(articleId, data
      );
      console.log(updatedArticle)

      if (!updatedArticle) {
        return res.status(404).send({
          status: false,
          message: "Article not found",
        });
      }

      res.status(200).send({
        status: true,
        message: "Post News Updated Successfully",
        data: updatedArticle,
      });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
const moment = require("moment");

app.get("/:userId/get-Postnews/:category", async (req, res) => {
  try {
    let userId = req.params.userId;
    const category = req.params.category;
    const currentDate = new Date();
    const localDateOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };
    const localDateFormat = new Intl.DateTimeFormat(undefined, localDateOptions);
    const localDateParts = localDateFormat.formatToParts(currentDate);
    const formattedDate = `${localDateParts[0].value}/${localDateParts[2].value}/${localDateParts[4].value}`;
    const formattedTime = `${localDateParts[6].value}:${localDateParts[8].value}:${localDateParts[10].value}`;
    const articles = await PostArticleModel.find({
      userId,
      category,
      isApproved: true,
      isRejected: false,
    }).sort({ createdAt: -1 })
      .lean();
    const filteredArticles = articles.filter(article => {
      var dateString = formattedDate;
      var dateComponents = dateString.split('/');
      var day = parseInt(dateComponents[0], 10);
      var month = parseInt(dateComponents[1], 10) - 1;
      var year = 2000 + parseInt(dateComponents[2], 10);
      var currentDate = new Date(year, month, day);
      var dateString = article.schedule_date;
      var dateComponents = dateString.split('-');
      var year = parseInt(dateComponents[0], 10);
      var month = parseInt(dateComponents[1], 10) - 1;
      var day = parseInt(dateComponents[2], 10);
      var articleDate = new Date(year, month, day);
      console.log("localtime----", formattedTime)
      console.log("sheduletime-----", article.schedule_time);
      let articleTime = article.schedule_time;
      if (currentDate >= articleDate && formattedTime >= articleTime) {
        return true;
      }
      else {
        return false;
      }
    });
    if (filteredArticles.length > 0) {
      res.status(200).send({
        status: true,
        message: "Get Post News Successfully",
        data: filteredArticles,
      });
    } else {
      res.status(200).send({
        status: true,
        message: "No post news available at this time",
        data: [],
      });
    }
=======

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
>>>>>>> origin/main
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

<<<<<<< HEAD
// Function to format dates as "DD/MM/YYYY" and times in "HH:mm" format in Indian time
function formatDate(dateString) {
  const options = {
    year: '2-digit', // Two-digit year (yy)
    month: '2-digit', // Two-digit month (MM)
    day: '2-digit',   // Two-digit day (dd)
    timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time (IST)
  };
  const date = new Date(dateString);
  const dateParts = date.toLocaleDateString(undefined, options).split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
}

function formatTime(timeString) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Set this to true to use 12-hour time format
    timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time (IST)
  };
  const time = new Date(`2023-11-06T${timeString}`);
  return time.toLocaleTimeString(undefined, options);
}


=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    let draftArticles = null;

    if (await SuperAdmin.findOne({ _id: userId }) || await VendorModel.findOne({ _id: userId })) {
      draftArticles = await DraftModel.find({ userId: userId, isRejected: false });
      let allPosts = [];

      await Promise.all(
        draftArticles.map(async (article) => {
          const postUserId = article.userId;
          let user = await SuperAdmin.findById(postUserId);
          let username = null;

          if (article.author_name && article.author_name.trim() !== '') {
            username = article.author_name;
          } else {
            let publication = await SuperAdmin.findById(postUserId);

            if (publication) {
              username = publication.name || (user ? user.name : "");
            }
          }

          if (file) {
            article.image = `/image/${file.filename}`;
          }

          allPosts.push({
            ...article.toObject(),
            username: username,
          });
        })
      );

      res.status(200).send({
        status: true,
        message: "Draft Articles Retrieved Successfully",
        data: allPosts,
      });
    }
=======
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
>>>>>>> origin/main
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

<<<<<<< HEAD

=======
>>>>>>> origin/main
//====================== [ Get Draft Article for Vendor ] =================/

app.get("/:userId/get-draft-articles-vendor", async (req, res) => {
  try {
<<<<<<< HEAD
    const userId = req.params.userId;
    const file = req.file;
    let draftArticles = null;

    if (await VendorModel.find({ userId })) {
      draftArticles = await DraftModel.find({ userId: userId, isRejected: false, isApproved: false });
      let allPosts = [];

      await Promise.all(
        draftArticles.map(async (article) => {
          const postUserId = article.userId;
          let user = await SuperAdmin.findById({ _id: postUserId });
          let username = null;

          if (user) {
            username = user.name;
          } else {
            let publication = await VendorModel.findById(postUserId);

            if (publication) {
              if (article.author_name && article.author_name.trim() !== '') {
                username = article.author_name;
              } else {
                username = publication.publisher_name;
              }
            }
          }

          if (file) {
            article.image = `/image/${file.filename}`;
          }

          allPosts.push({
            ...article.toObject(),
            username: username,
          });
        })
      );

      res.status(200).send({
        status: true,
        message: "Draft Articles Retrieved Successfully",
        data: allPosts,
      });
    } else {
      res.status(404).send({
        status: false,
        message: "No draft articles found for the given user.",
      });
    }
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
      email,
      email_1,
=======
      email_1,
      email_2,
>>>>>>> origin/main
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

<<<<<<< HEAD
    if (await UserRoleModel.findOne({ email: email }))
      return res
        .status(400)
        .send({ status: false, message: "Email already exist" });
=======
    if (await UserRoleModel.findOne({ email_1: email_1 }))
      return res
        .status(400)
        .send({ status: false, message: "Email_1 already exist" });
>>>>>>> origin/main

    if (await UserRoleModel.findOne({ mobile_2: mobile_2 }))
      return res
        .status(400)
        .send({ status: false, message: "Mobile_2 already exist" });

<<<<<<< HEAD
    if (await UserRoleModel.findOne({ email_1: email_1 }))
      return res
        .status(400)
        .send({ status: false, message: "Email_1 already exist" });
=======
    if (await UserRoleModel.findOne({ email_2: email_2 }))
      return res
        .status(400)
        .send({ status: false, message: "Email_2 already exist" });
>>>>>>> origin/main

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
<<<<<<< HEAD
        email: savedData.email,
        email_1: savedData.email_1,
=======
        email_1: savedData.email_1,
        email_2: savedData.email_2,
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
    if (newData.password) {

      const hashedPassword = await bcrypt.hash(newData.password, 10);

      existingPublication.password = hashedPassword;
    }

    for (const key in newData) {
      if (key !== "password") {
=======
    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
>>>>>>> origin/main
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
<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
    let News = await PostArticleModel.findById(postNewsId);

    if (!News) {
      return res.status(404).send({ status: false, message: "Post not found." });
    }

    let user = await SuperAdmin.findById(userId).lean();
    News.approved_by = user ? user.name : null;

    if (!user) {
      let publication = await VendorModel.findById(userId).lean();
      News.approved_by = publication ? publication.publisher_name : null;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

    let isApproved = false;
    if (News.isApproved === false || News.isApproved === true) {
      await PostArticleModel.findByIdAndUpdate(postNewsId, { $set: { isApproved: true, schedule_time: schedule_time || formattedTime, schedule_date: schedule_date || formattedDate, createdAt: new Date().toISOString(), } }, { new: true });
      isApproved = true;
    } else {
      return res.status(200).send({
        status: false,
        message: "Post was not updated. Invalid request."
      });
=======
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
>>>>>>> origin/main
    }

    return res.status(200).send({
      status: true,
      message: "Post Update Successfully",
<<<<<<< HEAD
      isApproved: isApproved
    });
=======
      isApproved: updateNews.isApproved
    })
>>>>>>> origin/main

  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
<<<<<<< HEAD
});


app.get("/:userId/getApproval", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const userId = req.params.userId;

    const approvedPosts = await PostArticleModel.find({ isApproved: true, isRejected: false }).lean();

    if (approvedPosts.length > 0) {
      const userIds = approvedPosts.map(post => post.userId);
      const users = await UserModel.find({ _id: { $in: userIds } }, { _id: 1, name: 1 }).lean();
      const vendors = await PublicationDetailsModel.find({ _id: { $in: userIds } }, { _id: 1, publisher_name: 1 }).lean();

      approvedPosts.forEach(post => {
        const user = users.find(u => u._id.toString() === post.userId.toString());
        const vendor = vendors.find(v => v._id.toString() === post.userId.toString());
        const authorName = post.author_name;
        const publisherName = vendor ? vendor.publisher_name : (user ? user.name : "");

        post.username = authorName || publisherName;
      });

      res.status(200).send({
        status: true,
        message: "Get Post News Successfully",
        data: approvedPosts,
      });
    } else {
      res.status(200).send({
        status: true,
        message: "No approved post news found for the user.",
=======

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
>>>>>>> origin/main
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

<<<<<<< HEAD

app.get("/:userId/getApprovalVendor", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const userId = req.params.userId;

    const approvedPosts = await PostArticleModel.find({ userId, isApproved: true, isRejected: false }).lean();

    if (approvedPosts.length > 0) {
      const userIds = new Set(approvedPosts.map(post => post.userId));

      const users = await SuperAdmin.find({ _id: { $in: [...userIds] } }).lean();
      const vendorUsers = await VendorModel.find({ _id: { $in: [...userIds] } }).lean();

      for (let i = 0; i < approvedPosts.length; i++) {
        const postUserId = approvedPosts[i].userId;

        const user = users.find(u => u._id.toString() === postUserId);
        const publication = vendorUsers.find(v => v._id.toString() === postUserId);

        if (!approvedPosts[i].author_name) {
          if (user) {
            approvedPosts[i].username = user.name;
          } else if (publication) {
            approvedPosts[i].username = publication.publisher_name;
          }
        } else {
          approvedPosts[i].username = approvedPosts[i].author_name;
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
=======
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
>>>>>>> origin/main
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

<<<<<<< HEAD

// ===================== [ Reject And Update ] =====================/
=======
//===================== [ Reject And Update ] =====================/
>>>>>>> origin/main

app.put("/:userId/RejectUpdateNews", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    let postNewsId = req.body._id;
    let data = req.body.remark;
<<<<<<< HEAD
    if (await PostArticleModel.findById({ _id: postNewsId })) {
      let News = await PostArticleModel.findById({ _id: postNewsId });
=======

    if (await PostArticleModel.findById({ _id: postNewsId })) {
      let News = await PostArticleModel.findById({ _id: postNewsId });

>>>>>>> origin/main
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

<<<<<<< HEAD

app.get("/:userId/getRejected", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const userId = req.params.userId;
    const rejectedPosts = await PostArticleModel.find({ userId: userId, isRejected: true, isApproved: false }).lean();

    if (rejectedPosts.length > 0) {
      const userIds = rejectedPosts.map(post => post.userId);
      const users = await SuperAdmin.find({ _id: { $in: userIds } }, { _id: 1, name: 1 }).lean();
      const vendors = await VendorModel.find({ _id: { $in: userIds } }, { _id: 1, publisher_name: 1 }).lean();

      rejectedPosts.forEach(post => {
        const user = users.find(u => u._id.toString() === post.userId.toString());
        const vendor = vendors.find(v => v._id.toString() === post.userId.toString());
        const authorName = post.author_name;
        const publisherName = vendor ? vendor.publisher_name : (user ? user.name : "");

        post.username = authorName || publisherName;
      });

      res.status(200).send({
        status: true,
        message: "Get Rejected Post News Successfully",
        data: rejectedPosts,
      });
    } else {
      res.status(200).send({
        status: true,
        message: "No rejected post news found for the user.",
=======
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
>>>>>>> origin/main
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
<<<<<<< HEAD
      message: "An error occurred while retrieving rejected post news.",
=======
      message: "An error occurred while retrieving post news.",
>>>>>>> origin/main
      error: error.message,
    });
  }
});

<<<<<<< HEAD

app.get("/:userId/getRejectedVendor", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const userId = req.params.userId;

    const rejectedPosts = await PostArticleModel.find({ userId, isRejected: true }).lean();

    if (rejectedPosts.length > 0) {
      const userIds = new Set(rejectedPosts.map(post => post.userId));

      const users = await SuperAdmin.find({ _id: { $in: [...userIds] } }).lean();
      const vendorUsers = await VendorModel.find({ _id: { $in: [...userIds] } }).lean();

      for (let i = 0; i < rejectedPosts.length; i++) {
        const postUserId = rejectedPosts[i].userId;

        const user = users.find(u => u._id.toString() === postUserId);
        const publication = vendorUsers.find(v => v._id.toString() === postUserId);

        if (!rejectedPosts[i].author_name) {
          if (user) {
            approvedPosts[i].username = user.name;
          } else if (publication) {
            rejectedPosts[i].username = publication.publisher_name;
          }
        } else {
          rejectedPosts[i].username = rejectedPosts[i].author_name;
        }
      }
      res.status(200).send({
        status: true,
        message: "Get Rejected Post News Successfully",
        data: rejectedPosts,
      });
    } else {
      res.status(200).send({
        status: true,
        message: "No rejected post news found for the user.",
=======
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
>>>>>>> origin/main
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
<<<<<<< HEAD
      message: "An error occurred while retrieving rejected post news.",
=======
      message: "An error occurred while retrieving post news.",
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    if (updateFields.password) {

      const hashedPassword = await bcrypt.hash(updateFields.password, 10);

      userRole.password = hashedPassword;
    }

    const updateRole = await userRole.save();
=======
>>>>>>> origin/main

    if (!userRole) {
      return res.status(404).json({ error: "User role not found" });
    }

<<<<<<< HEAD
    res.json(updateRole);
=======
    res.json(userRole);
>>>>>>> origin/main
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "An error occurred while updating user role" });
  }
});


//=============== [ Get Approved News latest Breaking News ]===========/ 

app.get("/:userId/getBreakingNews", async (req, res) => {
  try {
    var userId = req.params.userId;
<<<<<<< HEAD
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const response = await PostArticleModel.find({
      userId: userId,
      isApproved: true,
      isRejected: false,
      news_priority: "Breaking",
      schedule_date: { $lt: formattedDate },
      $or: [
        { schedule_date: formattedDate, schedule_time: { $lt: formattedTime } },
        { schedule_date: { $lt: formattedDate } }
      ]
    })
      .sort({ createdAt: -1, updatedAt: -1 })
      .limit(5)
      .lean();
    console.log(formattedDate, formattedTime)
    if (response.length > 0) {
      res.status(200).send({
        status: true,
        message: "Get Post News Successfully",
        data: response,
      });
    } else {
      res.status(200).send({
        status: true,
        message: "No breaking news available at this time",
        data: [],
      });
    }
=======
    const response = await PostArticleModel.find({ userId: userId, isApproved: true, isRejected: false, news_priority: "Breaking" })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.status(200).send({
      status: true,
      message: "Get Breaking News Successfully",
      data: response,
    });
>>>>>>> origin/main
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving breaking news.",
      error: error.message,
    });
  }
});

<<<<<<< HEAD


=======
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
  Middleware.jwtValidation,
  Middleware.authorization,
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
        templates,
=======
>>>>>>> origin/main
      } = data;

      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
<<<<<<< HEAD

=======
>>>>>>> origin/main
      let createdAdvertisement = await CreateAdvertisement.create(data);
      res.status(201).send({
        status: true,
        message: "Post News Created Successfully",
        data: createdAdvertisement,
      });
<<<<<<< HEAD

=======
>>>>>>> origin/main
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);

<<<<<<< HEAD

//========================[ Get Advertisement ]====================/

// app.get("/:userId/:page_name/:page_location/get-Advertisement", async (req, res) => {
//   try {
//     let page_name = req.params.page_name;
//     let page_location = req.params.page_location;
//     let userId = req.params.userId;
//     let file = req.file;
//     let data = req.body;
//     const post = await CreateAdvertisement.find({ userId: userId, page_name: page_name, page_location: page_location })
//       .sort({ createdAt: -1 })
//       .limit(1)
//       .lean();

//     if (!post || post.length === 0) {
//       const defaultAds = await CreateAdvertisement.find({ userId: "null" }).lean();

//       if (defaultAds && defaultAds.length > 0) {
//         const randomDefaultAd = defaultAds[Math.floor(Math.random() * defaultAds.length)];

//         res.status(200).send({ status: true, data: randomDefaultAd });
//       } else {
//         res.status(404).send({ status: false, message: "Default ad not found" });
//       }
//     } else {
//       data.userId = userId;
//       if (file) {
//         data.image = `/image/${file.filename}`;
//       }
//       post[0].data = data;

//       res.status(200).send({ status: true, data: post });
//     }
//   } catch (err) {
//     res.status(500).send({ status: false, error: err.message });
//   }
// });


=======
//========================[ Get Advertisement ]====================/

>>>>>>> origin/main
app.get("/:userId/:page_name/:page_location/get-Advertisement", async (req, res) => {
  try {
    let page_name = req.params.page_name;
    let page_location = req.params.page_location;
<<<<<<< HEAD
    let userId = req.params.userId;
    let file = req.file;
    let data = req.body;
=======
    let data = req.body;
    let userId = req.params.userId;
    let file = req.file;
>>>>>>> origin/main
    const post = await CreateAdvertisement.find({ userId: userId, page_name: page_name, page_location: page_location })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();
<<<<<<< HEAD
    console.log(post)
    if (!post || post.length === 0) {
      const defaultAds = await CreateAdvertisement.find({ userId: "null" }).lean();

      if (defaultAds && defaultAds.length > 0) {
        const randomDefaultAd = defaultAds[Math.floor(Math.random() * defaultAds.length)];

        res.status(200).send({ status: true, data: randomDefaultAd });
      } else {
        res.status(404).send({ status: false, message: "Default ad not found" });
      }
    } else {
      data.userId = userId;
      if (file) {
        data.image = `/image/${file.filename}`;
      }
      if (template = post[0].templates) {
        const AssignTemplate = await templates.findOne({ template_name: template });
        res.status(404).send({ status: false, message: "Template is not Selected" });
      }
      post[0].data = data;

      res.status(200).send({ status: true, data: post });

    }
=======

    if (!post) {
      return res.status(404).send({ status: false, message: "Post not found" });
    }

    data.userId = userId;
    if (file) {
      data.image = `/image/${file.filename}`;
    }

    res.status(200).send({ status: true, data: post });
>>>>>>> origin/main
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

<<<<<<< HEAD

//=======================[ vendor post pageName & pageLocation ]========

app.post("/:userId/vendorPageNameLocations", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
=======
//=======================[ vendor post pageName & pageLocation ]========

app.post("/:userId/vendorPageNameLocations", async (req, res) => {
>>>>>>> origin/main
  try {
    let userId = req.params.userId;
    let data = req.body;
    const { page_name, page_location } = data;


    const existingAdvertisement = await VendorPageNameLocation.findOne({ userId });

    if (existingAdvertisement) {
      return res.status(409).send({
        status: false,
<<<<<<< HEAD
        message: "Vendor Permission Allready set",
=======
        message: "Vendor Permission Allready set ",
>>>>>>> origin/main
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

<<<<<<< HEAD

//=======================[ Get vendor post pageName & pageLocation ]========

app.get("/:userId/getvendorPageNameLocations", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
=======
//=======================[ Get vendor post pageName & pageLocation ]========

app.get("/:userId/getvendorPageNameLocations", async (req, res) => {
>>>>>>> origin/main
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

<<<<<<< HEAD

//====================== [Vendor list of advertisement Id ]=====================/

app.get("/:userId/listadvertisements", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
  try {
    const userId = req.params.userId;

    const advertisements = await CreateAdvertisement.find({ userId });

    if (advertisements.length === 0) {
      res.status(404).send({
        status: false,
        message: "No advertisements found for the specified user.",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Advertisements retrieved successfully",
        data: advertisements,
      });
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//====================== [ Admin list of advertisement Id ]=====================/
app.get("/listadvertisements", async (req, res) => {
  try {
    const userId = req.params.userId;

    const advertisements = await CreateAdvertisement.find();

    if (advertisements.length === 0) {
      res.status(404).send({
        status: false,
        message: "No advertisements found for the specified user.",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Advertisements retrieved successfully",
        data: advertisements,
      });
    }
=======
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
>>>>>>> origin/main
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});

//====================== [ update list of advertisement Id ]=====================/

<<<<<<< HEAD
app.put("/:userId/update-advertisements", Middleware.jwtValidation, Middleware.authorization, async (req, res) => {
=======
app.put("/:userId/update-advertisements", async (req, res) => {
>>>>>>> origin/main
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

<<<<<<< HEAD

//======================[ Advertisement Setting ]=========================/
app.post("/advertisementSettings", async (req, res) => {
  try {
    const {
      userId,
      vendor_name,
      template,
      page_name,
      top_box,
      below_category,
      between_category,
      footer,
    } = req.body;

    const advertisementSettings = new AdvertisementSetting({
      userId,
      vendor_name,
      template,
      page_name,
      top_box,
      below_category,
      between_category,
      footer,
    });

    await advertisementSettings.save();

    res.status(201).json({ message: "AdvertisementSettings created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//************************ [ Search Part ]*****************************/

//====================== [ Searching vendor ]==========================/
=======
//====================== [ searching vendor ]==========================/
>>>>>>> origin/main
app.get('/vendorModels', async (req, res) => {
  const publisher_name = req.query.publisher_name;
  if (!publisher_name) {
    return res.status(400).json({ error: 'Please Provide a Parameter' });
  }

  try {
    const filteredVendorModels = await VendorModel.find({
<<<<<<< HEAD
      publisher_name: { $regex: new RegExp(publisher_name, 'i') },
=======
      publisher_name: { $regex: new RegExp(publisher_name, 'i') }, // Case-insensitive match
>>>>>>> origin/main
    });

    res.json(filteredVendorModels);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


<<<<<<< HEAD
//====================== [ Searching Role Base user with user_name ]==============/
app.get("/Rolesearch", async (req, res) => {
  const userName = req.query.userName;

  try {
    const user = await UserRoleModel.find({ user_name: userName });
    if (user) {
      res.status(201).json({
        success: true,
        message: 'user get successfully',
        user
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//====================== [ Searching Role name ]=====================/
app.get("/RoleNameSearch", async (req, res) => {
  const role_name = req.query.role_name;

  try {
    const user = await RollCreation.find({ role_name: role_name });
    if (user) {
      res.status(201).json({
        success: true,
        message: 'Role Name get successfully',
        user
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//====================== [ Searching Categories Name ]=====================/
app.get("/CategorieNameSearch", async (req, res) => {
  const categories_Name_English = req.query.categories_Name_English;

  try {
    const user = await MasterCategories.find({ categories_Name_English: categories_Name_English });
    if (user) {
      res.status(201).json({
        success: true,
        message: 'Categories Name get successfully',
        user
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//====================== [ Searching Tag Name ]=====================/
app.get("/TagNameSearch", async (req, res) => {
  const tag_name = req.query.tag_name;

  try {
    const user = await MasterTag.find({ tag_name: tag_name });
    if (user) {
      res.status(201).json({
        success: true,
        message: 'Tag Name get successfully',
        user
      });
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//====================== [ Searching Epaper Date ]===================/
app.get("/EpaperSearch", async (req, res) => {
  try {
    const { date, city } = req.query;

    if (!date && !city) {
      return res.status(400).json({ error: "At least one of date or city parameters is required" });
    }

    const query = {};

    if (date) {
      query.date = date;
    }

    if (city) {
      query.city = city;
    }

    const epapers = await Epaper.find(query);

    if (epapers.length === 0) {
      return res.status(404).json({ message: "No E-papers found for the given criteria" });
    }

    res.status(200).json(epapers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//************************ [ Templates Part ] *************************/
=======
>>>>>>> origin/main
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


<<<<<<< HEAD
//====================== [ E-paper ]================================/
=======
//====================== [ Epaper ]================================/
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
>>>>>>> origin/main
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000000,
  },
});
<<<<<<< HEAD
=======


>>>>>>> origin/main
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

<<<<<<< HEAD
//====================== [ Get Epaper Vendor List ]==============================/
// app.get('/:userId/Epapers', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const epapers = await Epaper.find({ userId })
//       .sort({ createdAt: -1 })
//       .lean()

//     if (!epapers) {
//       return res.status(404).json({
//         success: false,
//         message: 'No Epapers found for the specified user.',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Epapers retrieved successfully',
//       epapers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve Epapers',
//       error: error.message,
//     });
//   }
// });

=======
//====================== [ Get Epaper ]==============================/
>>>>>>> origin/main
app.get('/:userId/Epapers', async (req, res) => {
  try {
    const userId = req.params.userId;

<<<<<<< HEAD
    const epapers = await Epaper.find({ userId }).sort({ createdAt: -1 }).lean();

    if (!epapers || epapers.length === 0) {
=======
    const epapers = await Epaper.find({ userId });

    if (!epapers) {
>>>>>>> origin/main
      return res.status(404).json({
        success: false,
        message: 'No Epapers found for the specified user.',
      });
    }
<<<<<<< HEAD
    const results = [];

    for (const epaper of epapers) {
      const vendor = await PostArticleModel.findById(epaper.userId).lean();
      if (vendor) {
        results.push({
          ...epaper,
          author_name: vendor.publisher_name,
        });
      }
    }
    res.status(200).json({
      success: true,
      message: 'Epapers retrieved successfully with publisher names',
      epapers: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Epapers with publisher names',
      error: error.message,
    });
  }
});


//====================== [ Get Epaper Admin List ]==============================/
// app.get('/AdminEpapers', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const epapers = await Epaper.find()
//       .sort({ createdAt: -1 })
//       .lean()

//     if (!epapers) {
//       return res.status(404).json({
//         success: false,
//         message: 'No Epapers found for the specified user.',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Epapers retrieved successfully',
//       epapers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve Epapers',
//       error: error.message,
//     });
//   }
// });

app.get('/AdminEpapers', async (req, res) => {
  try {
    const epapers = await Epaper.find()
      .sort({ createdAt: -1 })
      .lean();

    if (!epapers || epapers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Epapers found for the specified user.',
      });
    }

    const results = await Promise.all(epapers.map(async (epaper) => {
      let vendor = await VendorModel.findOne({ _id: epaper.userId }).lean();
      if (!vendor) {
        vendor = await SuperAdmin.findOne({ _id: epaper.userId }).lean();
      }

      if (vendor) {
        return {
          ...epaper,
          author_name: vendor.publisher_name || vendor.name,
        };
      }

      return epaper;
    }));
=======
>>>>>>> origin/main

    res.status(200).json({
      success: true,
      message: 'Epapers retrieved successfully',
<<<<<<< HEAD
      epapers: results,
=======
      epapers,
>>>>>>> origin/main
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Epapers',
      error: error.message,
    });
  }
});


<<<<<<< HEAD
//====================== [ update Epaper ]==============================/
app.put("/:userId/updateEpaper/:id", upload.fields([{ name: "pdf", maxCount: 5 }]), async (req, res) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const newData = req.body;
    const files = req.files;

    const existingPublication = await Epaper.findById({ _id: id });

    if (!existingPublication) {
      return res.status(404).send({ status: false, message: "Publication not found" });
    }

    if (newData && typeof newData === "object") {
      Object.assign(existingPublication, newData);
    }

    if (files && files.pdf) {
      existingPublication.pdf = `/pdf/${req.files['pdf'][0].filename}`;
    }

    const updatedPublication = await existingPublication.save();

    const safePublicationDetails = { ...updatedPublication._doc };

    res.status(200).send({
      status: true,
      message: "Publication Details Updated Successfully",
      data: safePublicationDetails,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//====================== [ Delete Epaper ]==============================/
app.delete("/:userId/deleteEpaper/:id", async (req, res) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;

    const result = await Epaper.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send({ status: false, message: "Publication not found" });
    }

    res.status(200).send({
      status: true,
      message: "Publication Deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//=======================[ Location ]==============================/
app.post(
  "/Locations",
  async (req, res) => {
    try {
      let data = req.body;
      let {
        Country,
        States,
        Division,
        District,
        SubDivision,
        Tahsil,
        Town,
        Hindi,
        English,
        URL
      } = data;

      if (await LocationModel.find({ Country: Country, States: States, Division: Division, District: District, SubDivision: SubDivision, Tahsil: Tahsil, Town: Town, })) {
        res.status(400).send({
          status: false,
          message: "Already exist",
        });
      } else {
        let Location = await LocationModel.create(data);
        res.status(201).send({
          status: true,
          message: "Location Submit Successfully",
          data: Location,
        });
      }

    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);


//======================[ Get Location]============================/
app.get('/GetLocations', async (req, res) => {

  try {
    const locations = await LocationModel.find();

    res.status(200).send({
      status: true,
      message: "Locations retrieved successfully",
      data: locations,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
});


//======================[ Update Location ]=====================/
app.put(
  "/:id/updateLocations",
  async (req, res) => {
    try {
      let locationId = req.params.id;
      let updatedData = req.body;

      let updatedLocation = await LocationModel.findByIdAndUpdate(locationId, updatedData, { new: true });

      if (updatedLocation) {
        res.status(200).send({
          status: true,
          message: "Location updated successfully",
          data: updatedLocation,
        });
      } else {
        res.status(404).send({
          status: false,
          message: "Location not found",
        });
      }
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);


//======================[ Delete Location ]=====================/
app.delete(
  "/:id/deleteLocations",
  async (req, res) => {
    try {
      let locationId = req.params.id;

      let deletedLocation = await LocationModel.findByIdAndDelete(locationId);

      if (deletedLocation) {
        res.status(200).send({
          status: true,
          message: "Location deleted successfully",
          data: deletedLocation,
        });
      } else {
        res.status(404).send({
          status: false,
          message: "Location not found",
        });
      }
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }
);


//======================[ trial Api for post]===================/
app.post("/state-country", async (req, res) => {
  try {
    const data = req.body;

    const advertisementSettings = await StateModel.create(data);

    res.status(201).json({ message: "AdvertisementSettings created successfully!", advertisementSettings: advertisementSettings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

=======
>>>>>>> origin/main

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
