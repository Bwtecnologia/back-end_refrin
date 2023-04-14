const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "rota protegida" });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret);

    next();
  } catch (erro) {
    res.status(400).json({ msg: "token invalido" });
  }
};

//   const authGuard = async (req, res, next) => {

//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1]

//     // check if header has a token
//     if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

//     // check if token is valid
//     try {

//         const verified = jwt.verify(token, jwtSecret)

//         req.user = await User.findById(verified.id).select("-password")

//         next()

//     } catch (error) {
//         res.status(401).json({errors: ["Token Inválido"]})
//     }

// }

module.exports = checkToken;
