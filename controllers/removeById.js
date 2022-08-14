const contacts = require("../models/contacts.js");

const { RequestError } = require("../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Book deleted",
  });
};

module.exports = removeById;