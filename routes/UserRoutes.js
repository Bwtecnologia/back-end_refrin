const express = require("express");
const router = express.Router();

// controller
const {
  register,
  getAllUsers,
  getCurrentUser,
  getUserById,
  login,
  updateUser,
  deleteUser,
  getByActor,
} = require("../controllers/UserController");

// middlewares
const checkToken = require("../middlewares/checkToken");

// get current user
router.get("/", checkToken, getCurrentUser);
// get all users
router.get("/all", checkToken, getAllUsers);
//register user
router.post("/register", register);
// login
router.post("/login", login);
// get user by id
router.get("/:id", checkToken, getUserById);
// update user
router.put("/:id", checkToken, updateUser);
// delete a user
router.delete("/:id", checkToken, deleteUser);
// get by actor
router.get("/actor/:value", checkToken, getByActor);

module.exports = router;
