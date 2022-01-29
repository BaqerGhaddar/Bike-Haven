const seedBikes = require('./bikeData');
const seedParts = require('./partData');
const seedUser = require('./userData');
const sequelize = require('../config/connection');
const seedwishlist = require('./wishlistData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBikes();

  await seedParts();

  await seedUser();

  await seedwishlist();

  process.exit(0);
};

seedAll();
