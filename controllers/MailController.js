const Mail = require("../models/Mail");

const createMail = async (req, res) => {
  const { subject, body, from, to, date } = req.body;

  const newMail = {
    subject,
    body,
    from,
    to,
    date,
  };

  const createdMail = await Mail.create(newMail);
  if (!createMail)
    return res
      .status(422)
      .json({ message: "Ocorreu um erro, tente novamente" });

  res.status(200).json(createdMail);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const mail = await Mail.findOne({ where: { id: id } });
  if (!mail) return res.status(404).json({ message: "Email não encontrado" });

  res.status(200).json(mail);
};

const getAllMails = async (req, res) => {
  const data = await Mail.findAll();
  if (!data.length > 0) {
    res.status(404).json({ message: "Não possui E-mails" });
    return;
  }
  res.status(200).json(data);
};

module.exports = {
  createMail,
  getById,
  getAllMails,
};
