const db = require("../db/connect");

class User {
  constructor({
    user_id,
    first_name,
    last_name,
    user_name,
    email_address,
    is_council,
    council_id,
  }) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_name = user_name;
    this.email_address = email_address;
    this.is_council = is_council;
    this.council_id = council_id;
  }
  static async getAll() {
    const response = await db.query("SELECT * FROM users;");
    if (response.rows.length === 0) {
      throw new Error("No users available;");
    } else {
      return response.rows.map(u => new User(u));
    }
  }

  static async createUser(data) {
    const {
      first_name,
      last_name,
      user_name,
      email_address,
      is_council,
      council_id,
    } = data;

    const existingUser = await db.query(
      "SELECT user_name FROM users WHERE LOWER(user_name)=LOWER($1)",
      [user_name]
    );
    if (existingUser.rows.length === 0) {
      const response = await db.query(
        "INSERT INTO users(first_name, last_name, user_name, email_address, is_council, council_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        [
          first_name,
          last_name,
          user_name,
          email_address,
          is_council,
          council_id,
        ]
      );
      return new User(response.rows[0]);
    } else {
      throw new Error("This username already exists!");
    }
  }
}

module.exports = User;
