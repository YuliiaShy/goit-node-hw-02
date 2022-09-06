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
    token: {
        type: String,
        default: null,
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

const User = model("user", userSchema);

const schemas = {
  userAddSchema,
  userLoginSchema,
  updateSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};