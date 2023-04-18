const Mail = require("../models/Mail");

const getAllMails = async (req, res) => {
  const data = await Mail.findAll();
  if (!data.length > 0) {
    res.status(404).json({ message: "Não possui E-mails" });
    return;
  }
  res.status(200).json({ data });
};

module.exports = {
  getAllMails,
};
