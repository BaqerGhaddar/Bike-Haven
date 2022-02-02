const { Part } = require('../models');

const partData = [
  {
    type: 'Bike Frame',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Wheels',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Pedals',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Bike Saddle',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Handlebars',
    filename: 'kona-jake-the-snake.jpg'
  }
];

const seedParts = () => Part.bulkCreate(partData);

module.exports = seedParts;
