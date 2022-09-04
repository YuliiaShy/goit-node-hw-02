const express = require('express');

const { controllerWrapper } = require("../../helpers");
const { validationBody, validationId, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const {schemas} = require("../../models/contacts");
const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll)); 

router.get("/:id", validationId, controllerWrapper(ctrl.getById)); 

router.post(
  "/", authenticate,
  validationBody(schemas.contactAddSchema),
  controllerWrapper(ctrl.add)
); 

router.delete("/:id", validationId, controllerWrapper(ctrl.removeById)); 

router.put(
  "/:id",
  validationId,
  validationBody(schemas.contactAddSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router;
