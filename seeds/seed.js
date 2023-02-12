/* 
********not functioning yet DO NOT RUN SEED.js
*/


const sequelize = require('../config/connection');
const { User, Favorites, Courts } = require('../models');

const courtsData = require('./tennis_courts.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const courts of courtsData) {
    await Courts.create({
      ...courts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();