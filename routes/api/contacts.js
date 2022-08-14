const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers");
const { controllerWrapper } = require("../../helpers");
const { validationBody } = require("../../middlewares");
const schemas = require("../../schemas/schemas");

router.get("/", controllerWrapper(ctrl.getAll)); 

router.get("/:contactId", controllerWrapper(ctrl.getById)); 

router.post("/", validationBody(schemas.add), controllerWrapper(ctrl.add)); 

router.delete("/:contactId", controllerWrapper(ctrl.removeById)); 

router.put(
  "/:contactId",
  validationBody(schemas.add),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
