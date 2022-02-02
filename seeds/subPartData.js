const { Part } = require('../models');

const partData = [
  {
    part_id: 1,
    name: 'Parlee Chebacco',
    stock: 40,
    price: 4599,
    quality_type: 'Amazing',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    part_id: 2,
    name: 'Zipp 303 Firecrest',
    stock: 90,
    price: 1600,
    quality_type: 'Amazing',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    part_id: 3,
    name: 'Parlee Chebacco',
    stock: 40,
    price: 4599,
    quality_type: 'Amazing',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    part_id: 4,
    name: 'SHIMANO M8140 FLAT PEDAL',
    stock: 60,
    price: 99.99,
    quality_type: 'Amazing',
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    part_id: 5,
    name: 'Deity Components Speedway 35 Carbon Riser',
    stock: 88,
    price: 170,
    quality_type: 'Amazing',
    filename: 'kona-jake-the-snake.jpg'
  }
];

const seedParts = () => Part.bulkCreate(partData);

module.exports = seedParts;
