const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
