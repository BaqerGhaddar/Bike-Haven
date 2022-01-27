const seedBikes = require('./bikeData');
const seedParts = require('./partData');
const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    await seedBikes();

    await seedParts();

    process.exit(0);
};

seedAll();