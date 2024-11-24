const bcrypt = require("bcryptjs");
const userServices = require("../services/user.service");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Call the login service
    const result = await userServices.loginUser({ email, password });

    if (result.success) {
      // Login successful
      return res.status(200).json({
        message: "Login successful",
        data: result.user, // You can add a token here if required
      });
    } else if (result.errorType === "email") {
      // Invalid email
      return res.status(401).json({
        message: "Invalid email",
      });
    } else if (result.errorType === "password") {
      // Invalid password
      return res.status(401).json({
        message: "Invalid password",
      });
    } else {
      // General error
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
};


exports.registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    // Call the service to register the user
    const newUser = await userServices.registerUser({ first_name, last_name, email, phone, password });

    // Return success response with the created user
    return res.status(201).json({
      data: newUser, // Return the created user object
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle errors (e.g., unique constraint violation or other issues)
    return res.status(500).json({
      message: "Error registering user: " + error.message,
    });
  }
};


exports.updateUser = async (req, res, next) => {
  try {
    const { id, first_name, last_name, email, phone } = req.body;
    await userServices.updateUser({ id, first_name, last_name, email, phone });

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating user: " + error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await userServices.deleteUser({ id });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting user: " + error.message,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userServices.getUsers();

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching users: " + error.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await userServices.getUser({ id });

    return res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching user: " + error.message,
    });
  }
};
