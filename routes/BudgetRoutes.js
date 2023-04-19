const express = require("express");
const router = express.Router();

// controller
const {
  createBudget,
  getAll,
  getAllBySeller,
} = require("../controllers/BudgetController");

// middlewares
const checkToken = require("../middlewares/checkToken");

// create
router.post("/users/:userId/create", createBudget);
// get all
router.get("/", getAll);
// get all by seller
router.get("/seller/:id", getAllBySeller);

module.exports = router;
