const db = require("../db/connect");

class User {
  constructor(
    user_id,
    first_name,
    last_name,
    user_name,
    email_address,
    is_council,
    council_id
  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_name = user_name;
    this.email_address = email_address;
    this.is_council = is_council;
    this.council_id = council_id;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM User;");

    if (response.rows.length === 0) {
      throw new Error("No users available");
    } else {
      return response.rows.map(u => new User(u));
    }
  }
}
