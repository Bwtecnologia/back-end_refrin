const express = require("express");
const router = express.Router();

// controller
const {
  register,
  getUserById,
  login,
} = require("../controllers/UserController");

// middlewares
const checkToken = require("../middlewares/checkToken");

//register user
router.post("/register", register);
// get user by id
router.get("/:id", checkToken, getUserById);
// login
router.post("/login", login);

module.exports = router;
