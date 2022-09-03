const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const currentUser = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  const { subscription } = user;
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
     res.json({
        email,
        subscription,
      },);
};

module.exports = currentUser;
