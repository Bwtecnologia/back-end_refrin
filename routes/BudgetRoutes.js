const express = require("express");
const router = express.Router();

// controller
const {
  createBudget,
  getAll,
  getAllBySeller,
  getById,
} = require("../controllers/BudgetController");

// middlewares
const checkToken = require("../middlewares/checkToken");



// get all
router.get("/", getAll);
// getById
router.get("/:id", getById);
// get all by seller
router.get("/seller/:id", getAllBySeller);
// create
router.post("/users/:userId/create", createBudget);


module.exports = router;
