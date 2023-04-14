const express = require("express");
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));

module.exports = router;
