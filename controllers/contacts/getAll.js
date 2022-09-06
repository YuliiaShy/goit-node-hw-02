const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    "-createdAt -updateAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;

