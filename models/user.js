const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { schemaValidation } = require("../helpers");
const bcrypt = require("bcryptjs");

const PASSWORD_REGEXP = /^[a-zA-Z0-9]{6,10}$/;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: [true, "Set avatar for user"],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", schemaValidation);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const userAddSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().pattern(PASSWORD_REGEXP).required(),
  repeatPassword: Joi.string().required().valid(Joi.ref("password")),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().pattern(PASSWORD_REGEXP).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
});

const User = model("user", userSchema);

const schemas = {
  userAddSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};

module.exports = {
  User,
  schemas,
};