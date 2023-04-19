const Budget = require("../models/Budget");
const User = require("../models/User");

const createBudget = async (req, res) => {
  try {
    const { subject, body, from, to } = req.body;
    const { userId } = req.params;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const seller = { userId: user.id, sellerName: user.username }; // Creating the seller object using the user's ID and name
    const budget = await Budget.create({ subject, body, from, to, seller }); // Creating a new instance of the Budget model with the seller object
    await budget.setUser(user); // Setting the user for the budget
    res.status(201).json({ budget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAll = async (req, res) => {
  const budgets = await Budget.findAll();
  if (!budgets.length > 0) {
    res.status(404).json({ message: "Sem orçamentos registrados" });
    return;
  }
  res.status(200).json(budgets);
};

const getAllBySeller = async (req, res) => {
  const { id } = req.params;

  const budgets = await Budget.findAll({ where: { userId: id } });
  if (!budgets.length > 0) {
    res.status(404).json({ message: "Sem orçamentos registrados" });
    return;
  }

  res.status(200).json(budgets);
};

module.exports = { createBudget, getAll, getAllBySeller };
