const { Part } = require('../models');

const partData = [
  {
    type: 'Bike Rack',
    stock: 57,
    price: 129.0,
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Adjustable Kickstand',
    stock: 42,
    price: 44.0,
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Flat Pedals',
    stock: 158,
    price: 129.0,
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'LED Handlebar Headlight',
    stock: 110,
    price: 61.0,
    filename: 'kona-jake-the-snake.jpg'
  },
  {
    type: 'Hand Pump',
    stock: 26,
    price: 57.0,
    filename: 'kona-jake-the-snake.jpg'
  }
];

const seedParts = () => Part.bulkCreate(partData);

module.exports = seedParts;
