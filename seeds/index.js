const sequelize = require('../config/connection');
const seedBikes = require('./bikeData');
const seedParts = require('./partData');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    await seedBikes();

    await seedParts();

    process.exit(0);
};

seedAll();