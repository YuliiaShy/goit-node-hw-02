const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { schemaValidation } = require("../helpers");

const PHONE_REGEXP = /^\(\d{3}\) \d{3}-\d{4}$/;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: PHONE_REGEXP,
      unique: true,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", schemaValidation)

const Contact = model("contact", contactSchema);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  phone: Joi.string().pattern(PHONE_REGEXP).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required()
});

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
