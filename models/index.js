const User = require ('./User');
const Courts = require ('./Courts');
const Favorites = require ('./Favorites');

User.belongsToMany(Courts, {
    through: {
        model: Favorites,
        unique: false
      },
      as: 'favorite_courts'
});

Courts.belongsToMany(User, {
    through: {
        model: Favorites,
        unique: false
      },
      as: 'users_favorited'
});

module.exports = { User, Courts, Favorites };