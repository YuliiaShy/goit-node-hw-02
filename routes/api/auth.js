const express = require("express");
const ctrl = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validationBody, authenticate} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validationBody(schemas.userAddSchema), controllerWrapper(ctrl.register));

router.post("/login", validationBody(schemas.userLoginSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

module.exports = router;