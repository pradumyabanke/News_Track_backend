const express = require("express");
const Router = express.Router();
const bodyParser = require("body-parser");
const Controller = require("../Controllers/user");
const Middleware = require("../Middleware/auth")


Router.post("/createUser", Controller.createUser);
Router.post("/adminLogin", Controller.userLogin);
Router.post("/createPlateform", Controller.CreatePlateform)
Router.post("/createCategories", Controller.CreateCategories)
Router.post("/createSubCategories", Controller.CreateSubCategories)
Router.post("/language", Controller.UserLanguage)
Router.post("/article", Controller.CreateArticle)
// Router.put("/UpdateArticle", Controller.UpdatePostArticle)
Router.post("/mediaType", Controller.createMediaModel)
Router.get("/get-states", Controller.getState)
Router.post("/check-box", Controller.CheckBox)
Router.post("/select", Controller.SelectCategories)
Router.post("/status", Controller.StatusModel)
Router.post("/newsPaperAgencyLogin", Controller.NewsPaperAgencyLogin)
Router.get("/:userId/postGet", Controller.getPostNews)
Router.get("/:userId/postGetVendor", Controller.getPostNewsVendor)
Router.put("/:userId/postUpdate", Controller.updatePostNews);
Router.put("/:userId/UpdateDateTime", Controller.updateScheduleDateTime);
Router.post("/:userId/addroles", Middleware.jwtValidation, Middleware.authorization, Controller.AddRolesModel);
Router.post("/:userId/RollbaseLogin",Middleware.jwtValidation, Middleware.authorization, Controller.RollbaseLogin)
Router.post("/:userId/roll-creation", Middleware.jwtValidation, Middleware.authorization, Controller.Roll_CreationModel);
Router.get("/:userId/getAllRoles", Middleware.jwtValidation, Middleware.authorization, Controller.getAllRoles);
Router.get("/:userId/getAllroleslist", Middleware.jwtValidation, Middleware.authorization, Controller.getAllroleslist);
Router.put("/:userId/updateRollBase", Controller.updateRollBase);
Router.delete("/:userId/deleteRollBase", Controller.deleteRollBase);
Router.post("/mastercategories", Controller.MasterCategories);
Router.post("/masterCategories", Controller.Mastercategories);
Router.get("/:userId/getmasterCategories", Controller.GetMasterCategoryById);
Router.post("/mastertag", Controller.MasterTag);
Router.get("/getmastercategories", Controller.GetMasterCategories);
Router.get("/getmastertag", Controller.GetMasterTag);
Router.put("/:userId/updateCategories", Controller.UpdateMasterCategory);
Router.delete("/:userId/deleteCategories", Controller.DeleteMasterCategory);
Router.put("/:userId/updateTag", Controller.UpdateTag);
Router.delete("/:userId/deleteTag", Controller.DeleteTag);


Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));



//===================== checking your end point valid or not =======================//

Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
});



module.exports = Router;
