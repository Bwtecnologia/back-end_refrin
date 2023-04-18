const express = require("express");
const router = express.Router();

// controller
const { getAllMails } = require("../controllers/MailController")

// middlewares
const checkToken = require("../middlewares/checkToken");

// get current user
router.get("/", getAllMails)

module.exports = router;
