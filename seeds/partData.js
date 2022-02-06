const { Part } = require('../models');

const partData = [
  {
    type: 'Bike Frame',
    filename: 'bike_frame_stock.jpg'
  },
  {
    type: 'Wheels',
    filename: 'bike_wheels_stock.jpg'
  },
  {
    type: 'Pedals',
    filename: 'bike_pedals_stock.jpg'
  },
  {
    type: 'Bike Saddle',
    filename: 'bike_saddle_stock.jpg'
  },
  {
    type: 'Handlebars',
    filename: 'bike_handlebars_stock.jpg'
  }
];

const seedParts = () => Part.bulkCreate(partData);

module.exports = seedParts;
