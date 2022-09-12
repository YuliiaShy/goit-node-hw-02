const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const { PORT } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw RequestError(400, "Missing required field email");
    }

    const user = await User.findOne({ email });
    if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Verify register on site",
    html: `<a href="http://localhost:${PORT}/api/auth/verify/${user.verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
