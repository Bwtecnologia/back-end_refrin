const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "bwtecn91_refrin_react",
  "bwtecn91",
  "n9v6A1fk3N",
  {
    host: "108.179.193.14",
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Conectado com sucesso!");
} catch (err) {
  console.log(`NÃO FOI POSSÍVEL CONECTAR => ${err}`);
}

module.exports = sequelize;
