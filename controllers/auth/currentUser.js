const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
    res.json(user);
};

module.exports = currentUser;
