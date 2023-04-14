const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// GENERATE USER TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// REGISTER USER
const register = async (req, res) => {
  const { username, email, password } = req.body;

  //validations
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Informe todos os dados para se cadastrar" });
  }

  // if (!confirmPassword) {
  //   res.status(403).json({ msg: "Por favor confirme a senha" });
  //   return;
  // }

  // if (password != confirmPassword) {
  //   res.status(403).json({ msg: "As senhas não são iguais" });
  //   return;
  // }

  const checkIfUserExists = await User.findOne({
    where: { username: username },
  });

  if (checkIfUserExists) {
    res
      .status(403)
      .json({ msg: "Email já cadastrado, por favor ultilize outro" });
    return;
  }

  // create a password
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      msg: "usuario criado com suscesso",
      token: generateToken(createdUser.id),
      createdUser,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// GET BY ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    res.status(404).json({ msg: "Usuário não encontrado" });
    return;
  }

  res.status(200).json({ user });
};

// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    res.status(422).json({ msg: "Informe nome e senha para entrar" });
    return;
  }

  if (!username) {
    res.status(422).json({ msg: "Nome é obrigatório" });
    return;
  }

  if (!password) {
    res.status(422).json({ msg: "Senha é obrigatória" });
    return;
  }

  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.status(400).json({ msg: "Usuário não encontrado" });
    return;
  }

  const checkedPassword = await bcrypt.compare(password, user.password);
  if (!checkedPassword) {
    res.status(422).json({ msg: "Senha inválida" });
    return;
  }

  res.status(200).json({ msg: "Bem vindo(a)", token: generateToken(user.id) });
};

module.exports = { register, getUserById, login };
