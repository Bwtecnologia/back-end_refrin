require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conn = require("./config/conn");

const app = express();
const port = process.env.PORT;

//models

//config para ler json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config para o cors
app.use(cors());

// rotas
const router = require("./routes/routes");
app.use(router);

conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server rodadando na porta ${port}`);
    });
  })
  .catch((err) => console.log(err));
