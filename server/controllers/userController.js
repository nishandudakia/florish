const bcrypt = require("bcrypt");
const User = require("../models/users");
const Token = require("../models/token");

async function index(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show (req, res) {
  try {
      const token = req.params.token;
      console.log(token)
      const user = await Token.getOneByToken(token);
      console.log(user)
      res.json(user);
  } catch (err) {
      res.status(404).json({"error": err.message})
  }
};

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);
    const authenticated = await bcrypt.compare(data.password, user["password"]);
    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      const token = await Token.create(user.user_id);
      res.status(200).json({ authenticated: true, token: token.token });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function signUp(req, res) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    data["password"] = await bcrypt.hash(data["password"], salt);
    const result = await User.createUser(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {index, login, signUp, show };
