const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model {}

Favorites.init (
   {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
      },
      court_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'courts',
          key: 'id',
          unique: false
        }
    }
    
   },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites'
  }
  );

  module.exports = Favorites;