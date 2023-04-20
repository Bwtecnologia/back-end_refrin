const express = require("express");
const router = express.Router();

// controller
const {
  createMail,
  getById,
  getAllMails,
  deleteMail,
} = require("../controllers/MailController");

// middlewares
const checkToken = require("../middlewares/checkToken");

// create mail
router.post("/", createMail);
// get All email
router.get("/", getAllMails);
// get by id
router.get("/:id", getById);
router.delete("/delete/:id", deleteMail);

module.exports = router;
