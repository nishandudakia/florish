const User = require("../../../models/Users");
const db = require("../../../db/connect");

describe(User, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("resolves with users successfully", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ fname: "u1" }, { fname: "u2" }, { fname: "u3" }],
      });

      const users = await User.getAll();

      expect(users).toHaveLength(3);
      expect(users[0]).toHaveProperty("user_id");
    });

    it("should throw an Error on db query error", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      try {
        await User.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe("No users available");
      }
    });
  });

  describe("createUser", () => {
    it("resolves with user on successful db query", async () => {
      let userData = {
        fname: "Tom",
        lname: "Smith",
        username: "tsmith",
        email: "tsmith@gmail.com",
        password:
          "$2y$10$7e1OT8Ef0dzeGmlscb3d9OLYtEYqFuwbN3aqwA6GsyoSGlzJiRdY.",
      };

      // Mock db.query to return an empty result, indicating the username does not exist yet
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Mock the insert operation to return the inserted user
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...userData, user_id: 1 }] });

      // Mock the getOneById call to return the created user
      jest
        .spyOn(User, "getOneById")
        .mockResolvedValueOnce({ ...userData, user_id: 1 });

      const result = await User.createUser(userData);

      expect(result).toBeTruthy();
      expect(result.user_id).toEqual(1); // Adjusted assertion for the user ID
      expect(result.fname).toEqual("Tom"); // Adjusted assertion for the user's first name
      expect(result.lname).toEqual("Smith"); // Adjusted assertion for the user's last name
    });

    it("should throw an Error on db query error", async () => {
      // Mock db.query to return a non-empty result, indicating the username already exists
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ username: "tsmith" }] });

      try {
        await User.createUser({ username: "tsmith" });
      } catch (error) {
        expect(error).toBeTruthy();
        expect(error.message).toBe("This username already exists!");
      }
    });
  });

  describe("getOneByUsername", () => {
    it("resolves with user when user with provided username exists", async () => {
      const username = "testuser";
      const userData = { username: "testuser", fname: "Test", lname: "User" };
      const expectedUser = new User(userData);

      db.query.mockResolvedValueOnce({ rows: [userData] });

      const result = await User.getOneByUsername(username);

      expect(result).toEqual(expectedUser);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        [username]
      );
    });

    it("should throw an Error when no user with provided username exists", async () => {
      const username = "nonexistentuser";

      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.getOneByUsername(username)).rejects.toThrow(
        "No users available;"
      );
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        [username]
      );
    });
  });
 describe("getOneById", () => {
   it("resolves with user when user with provided ID exists", async () => {
     const user_id = 1;
     const userData = { user_id: 1, fname: "Test", lname: "User" };
     const expectedUser = new User(userData);

     db.query.mockResolvedValueOnce({ rows: [userData] });

     const result = await User.getOneById(user_id);

     expect(result).toEqual(expectedUser);
     expect(db.query).toHaveBeenCalledWith(
       "SELECT * FROM users WHERE user_id = $1",
       [user_id]
     );
   });

   it("should throw an Error when no user with provided ID exists", async () => {
     const user_id = 999;

     db.query.mockResolvedValueOnce({ rows: [] });

     await expect(User.getOneById(user_id)).rejects.toThrow(
       "Unable to locate user."
     );
     expect(db.query).toHaveBeenCalledWith(
       "SELECT * FROM users WHERE user_id = $1",
       [user_id]
     );
   });
 });



});
