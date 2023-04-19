const express = require("express");
const router = express.Router();

// controller
const {
  createMail,
  getById,
  getAllMails,
} = require("../controllers/MailController");

// middlewares
const checkToken = require("../middlewares/checkToken");

// create mail
router.post("/", createMail);
// get by id
router.get("/:id", getById);
// get All email
router.get("/", getAllMails);

module.exports = router;
