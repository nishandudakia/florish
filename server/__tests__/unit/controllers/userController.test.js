const User = require("../../../models/Users");
const { index, login } = require("../../../controllers/userController");
const Token = require("../../../models/Token");
const bcrypt = require("bcrypt");

jest.mock("../../../models/Users");
jest.mock("../../../models/Token");
jest.mock("bcrypt");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));
const mockRes = { status: mockStatus };

// Assuming the path to the User model is correct

describe("index", () => {
  it("should return all users with status code 200", async () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    jest.spyOn(User, "getAll").mockResolvedValue(mockUsers);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await index(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should return error message with status code 500 when an error occurs", async () => {
    const errorMessage = "Internal server error";

    jest.spyOn(User, "getAll").mockRejectedValue(new Error(errorMessage));

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await index(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe("login function", () => {
  it("should return a token with status code 200 when credentials are correct", async () => {
    const req = { body: { username: "testuser", password: "password123" } };
    const mockUser = {
      user_id: 1,
      username: "testuser",
      password: "$2y$10$7e1OT8Ef0dzeGmlscb3d9OLYtEYqFuwbN3aqwA6GsyoSGlzJiRdY.",
    };
    const mockToken = { token: "mockTokenValue" };

    User.getOneByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    Token.create.mockResolvedValue(mockToken);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      authenticated: true,
      token: "mockTokenValue",
    });
  });

  it("should return status code 403 and error message when credentials are incorrect", async () => {
    const req = { body: { username: "testuser", password: "wrongpassword" } };

    User.getOneByUsername.mockResolvedValue({
      username: "testuser",
      password: "$2y$10$7e1OT8Ef0dzeGmlscb3d9OLYtEYqFuwbN3aqwA6GsyoSGlzJiRdY.",
    });
    bcrypt.compare.mockResolvedValue(false);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Incorrect credentials.",
    });
  });

  it("should return status code 403 and error message when user cannot be found", async () => {
    const req = {
      body: { username: "nonexistentuser", password: "password123" },
    };

    User.getOneByUsername.mockResolvedValue("password123");

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Incorrect credentials.",
    });
  });
});

