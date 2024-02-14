const User = require("../models/Users");

async function getAllUsers(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createUser(req, res) {
  try {
    const data = req.body;
    const newUser = await User.createUser(data);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getAllUsers, createUser };
