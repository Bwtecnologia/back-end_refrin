const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/conn");
const User = require("../models/User");

const Budget = db.define("Budget", {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

Budget.belongsTo(User, { foreignKey: "userId" });

module.exports = Budget;
