const express = require("express");
const ctrl = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const {  validationBody,  validationId, authenticate, upload} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/register",
    validationBody(schemas.userAddSchema),
    controllerWrapper(ctrl.register));

router.post("/login",
    validationBody(schemas.userLoginSchema),
    controllerWrapper(ctrl.login));

router.get("/logout",
    authenticate,
    controllerWrapper(ctrl.logout));

router.get("/current",
    authenticate,
    controllerWrapper(ctrl.currentUser));

router.patch(
  "/:id/subscription",
  authenticate,
  validationId,
  validationBody(schemas.updateSubscriptionSchema),
  controllerWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken",
  controllerWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  controllerWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
