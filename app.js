require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");

const app = express();

//models
const User = require("./models/User");

//config para ler json
app.use(express.json());

//config para o cors
app.use(cors());

//rota teste publica
app.get("/", (req, res) => {
  res.status(200).json({ msg: "iniciando" });
});

// private route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //check if users exist
  const user = await User.findById(id, "-password");
  if (!user) {
    return res.status(404).json({ msg: "usuario nao encontrado" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "rota protegida" });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (erro) {
    res.status(400).json({ msg: "token invalido" });
  }
}

//register user  ROUTE
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  //validations
  if (!name && !email && !password) {
    return res.status(422).json({ msg: "dados invalidos" });
  }
  //check if user exist
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ msg: "email ja em uso" });
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });
  try {
    await user.save();
    res.status(201).json({ msg: "usuario criado com suscesso" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//login

app.post("/auth/user", async (req, res) => {
  const { email, password } = req.body;
  // passar no body o email e a password

  //valida se  nao foi passado nada vazio
  if (!email && !password) {
    return res.status(422).json({ msg: "email ou senha incorretos" });
  }

  //check if user exist
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "usuario nao encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "senha invalida" });
  }

  // try {
  //   const secret = a1b2c3;
  //   const token = jwt.sign(
  //     {
  //       id: user.id,
  //     },
  //     secret
  //   );

  //   res.status(200).json({ msg: "usuarios logado ", token });
  // } catch (error) {
  //   res.status(500).json({ msg: "aaaaaa", error });
  // }

  res.status(200).json({ msg: "usuarios logado " })
});

//chech if password match

//credenciais

mongoose
  .connect(
    `mongodb+srv://gudden:NOaW2jTpqAd29ce5@cluster0.vcdkwys.mongodb.net/test`
  )
  .then(() => {
    app.listen(3001);
    console.log("tudo certo ta rodando na porta 3001");
  })
  .catch((err) => {
    console.log(err);
  });
