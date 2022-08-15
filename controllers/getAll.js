const contacts = require("../models/contacts.js");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAll;