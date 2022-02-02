const { User } = require('../models');

const userData = [
  {
    username: 'vlad',
    name: 'vlad',
    email: 'vlad@gmail.com',
    password: 'password123'
  },
  {
    username: 'Phil Master',
    name: 'phil',
    email: 'phil@gmail.com',
    password: 'password123'
  }
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
