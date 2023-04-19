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
  const { username, email, sector, branch, phone, password, role, actor } =
    req.body;

  //validations
  if (!username || !email || !phone || !password || !role || !actor) {
    return res
      .status(400)
      .json({ message: "Informe todos os dados para se cadastrar" });
  }

  const checkIfUserExists = await User.findOne({
    where: { username: username },
  });
  if (checkIfUserExists) {
    res.status(403).json({ message: "Usuário já cadastrado" });
    return;
  }

  const checkIfEmailExist = await User.findOne({ where: { email: email } });
  if (checkIfEmailExist) {
    res.status(403).json({ message: "Email já cadastrado" });
    return;
  }

  // create a password
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const createdUser = await User.create({
      username,
      email,
      sector,
      branch,
      phone,
      password: hashedPassword,
      role,
      actor,
    });
    res.status(201).json({
      message: "usuario criado com suscesso",
      token: generateToken(createdUser.id),
      createdUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// GET ALL USER
const getAllUsers = async (req, res) => {
  const data = await User.findAll();
  res.status(200).json(data);
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
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
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(422).json({ message: "Informe nome e senha para entrar" });
    return;
  }

  if (!email) {
    res.status(422).json({ message: "Email é obrigatório" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "Senha é obrigatória" });
    return;
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res
      .status(404)
      .json({ message: "Usuário não encontrado, informe um email válido" });
    return;
  }

  const checkedPassword = await bcrypt.compare(password, user.password);
  if (!checkedPassword) {
    res.status(422).json({ message: "Senha inválida" });
    return;
  }

  res.status(200).json({
    message: "Bem vindo(a)",
    id: user.id,
    role: user.role,
    token: generateToken(user.id),
  });
};

// UPDATE USER
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, phone, password, role, actor } = req.body;

  console.log("req.body:", req.body);

  if (!email) {
    res.status(500).json({ message: "Email é obrigatório" });
    return;
  }

  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  if (username) {
    user.username = username;
  }

  if (email) {
    user.email = email;
  }

  if (actor) {
    user.actor = actor;
  }

  if (phone) {
    user.phone = phone;
  }

  if (password) {
    // create a password
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.password = hashedPassword;
  }

  if (role) {
    user.role = role;
  }

  const newUser = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    actor: user.actor,
    password: user.password,
    role: user.role,
  };

  try {
    const updatedUser = await User.update(newUser, { where: { id: id } });

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.log("Error:", error);

    res.status(500).json({ message: "Ocorreu um erro, tente novamente" });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  await user.destroy({ where: { id: id } });

  res.status(200).json({ message: "Usuário excluído com sucesso" });
};

// GET BY ACTOR
const getByActor = async (req, res) => {
  const { value } = req.params;

  const users = await User.findAll({ where: { actor: value } });
  if (!users) {
    res.status(404).json({ message: "Nenhum usuário não encontrado" });
    return;
  }

  res.status(200).json(users);
};

module.exports = {
  register,
  getAllUsers,
  getCurrentUser,
  getUserById,
  login,
  updateUser,
  deleteUser,
  getByActor,
};
