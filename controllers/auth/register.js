const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const shortid = require("shortid");
const { PORT } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = shortid.generate();
  const newUser = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Verify register on site",
    html: `<a href="http://localhost:${PORT}/api/auth/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await sendEmail(mail)
  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = register;
