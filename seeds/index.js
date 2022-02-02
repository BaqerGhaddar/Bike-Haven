const seedBikes = require('./bikeData');
const seedParts = require('./partData');
const seedUser = require('./userData');
const seedSubParts = require('./subPartData');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBikes();

  await seedParts();

  await seedUser();

  await seedSubParts();

  process.exit(0);
};

seedAll();
