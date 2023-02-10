const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Courts extends Model {}

Courts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      wall: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      grass: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      indoor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lights: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      proshop: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'courts',
  }
 
);

module.exports = Courts;
