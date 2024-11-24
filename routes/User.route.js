const express = require("express");
const cors = require("cors");
const usersController = require("../controllers/User.controller");

const router = express.Router();

// Enable CORS
router.use(cors());

// User Routes
router.post("/login", usersController.login);
router.post("/register", usersController.registerUser);
router.post("/update", usersController.updateUser);
router.post("/delete", usersController.deleteUser);
router.get("/getUser", usersController.getUser);
router.get("/getUsers", usersController.getUsers);

module.exports = router;
