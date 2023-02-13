/*
 ********not functioning yet DO NOT RUN SEED.js
 */

const sequelize = require("../config/connection");
const { User, Favorites, Courts } = require("../models");
const courtData = require("./tennis_courts.json");

const courtsData = require("./tennis_courts.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  // const courts = await Courts.bulkCreate(courtData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const courts of courtsData) {
    await Courts.create({
      street: courts.street,
      city: courts.city,
      state: courts.state,
      zip_code: courts.zip_code,
      type: courts.type,
      count: courts.count,
      clay: courts.clay,
      wall: courts.wall,
      grass: courts.grass,
      indoor: courts.indoor,
      lights: courts.lights,
      proshop: courts.proshop,
      latitude: courts.latitude,
      longitude: courts.longitude,
    });
  }

  process.exit(0);
};

seedDatabase();
