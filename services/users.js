const User = require("../models/user");
const messages = require("../lib/messages");

const getUsers = async (req, res) => {
  try {
    const users = await User.fetchAll();
    res.send(users);
    return users;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = await User.where({ id }).fetch();
    res.send(user);
    return user;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

module.exports = {
  getUsers,
  getUser,
};
