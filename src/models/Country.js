const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  capital: {
    type: DataTypes.STRING,
    allowNull: true
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  population: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  currency_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  exchange_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  estimated_gdp: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true
  },
  flag_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_refreshed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'countries',
  timestamps: false
});

module.exports = Country;
