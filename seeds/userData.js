const { User } = require('../models');

const userData = [
  {
    username: 'vlad',
    email: 'vlad@gmail.com',
    password: 'password123'
  },
  {
    username: 'Phil',
    email: 'phil@gmail.com',
    password: 'password123'
  }
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
