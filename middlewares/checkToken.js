const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const verified = jwt.verify(token, jwtSecret);
    req.user = await User.findOne({
      where: { id: verified.id },
      attributes: { exclude: ["password"] },
    });

    next();
  } catch (erro) {
    res.status(400).json({ msg: "token inválido" });
  }
};

module.exports = checkToken;
