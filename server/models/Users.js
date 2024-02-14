const db = require("../db/connect");

class User {
  constructor({
    user_id,
    fname,
    lname,
    username,
    email,
    password,
    is_council,
    council_id,
  }) {
    this.user_id = user_id;
    this.fname = fname;
    this.lname = lname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.is_council = is_council;
    this.council_id = council_id;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM users;");

    if (response.rows.length === 0) {
      throw new Error("No users available");
    } else {
      return response.rows.map(u => new User(u));
    }
  }

  static async getOneById(user_id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (response.rows.length === 0) {
      throw new Error("No users available;");
    } else {
      return new User(response.rows[0]);
    }
  }

  static async createUser(data) {
    const { fname, lname, username, email, password, is_council, council_id } =
      data;

    const existingUser = await db.query(
      "SELECT username FROM users WHERE LOWER(username)=LOWER($1)",
      [username]
    );
    if (existingUser.rows.length === 0) {
      const response = await db.query(
        "INSERT INTO users(fname, lname, username, email, password, is_council, council_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
        [fname, lname, username, email, password, is_council, council_id]
      );
      const newId = response.rows[0].user_id;
      const newUser = await User.getOneById(newId);
      return newUser;
    } else {
      throw new Error("This username already exists!");
    }
  }
}

module.exports = User;
