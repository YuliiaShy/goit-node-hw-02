const {Contact} = require("../../models/contacts");

const add = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({...req.body, owner:_id});
  res.status(201).json(newContact);
};

module.exports = add;
