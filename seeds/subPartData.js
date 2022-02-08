const { SubPart } = require('../models');

const SubPartData = [
  {
    part_id: 1,
    name: 'Parlee Chebacco',
    price: 4599,
    quality_type: 'Amazing',
    filename: 'bike_frame_stock.jpg'
  },
  {
    part_id: 2,
    name: 'Zipp 303 Firecrest',
    price: 1600,
    quality_type: 'Amazing',
    filename: 'bike_handlebars_stock.jpg'
  },
  {
    part_id: 3,
    name: 'Parlee Chebacco',
    price: 4599,
    quality_type: 'Amazing',
    filename: 'bike_pedals_stock.jpg'
  },
  {
    part_id: 4,
    name: 'SHIMANO M8140 FLAT PEDAL',
    price: 99.99,
    quality_type: 'Amazing',
    filename: 'bike_saddle_stock.jpg'
  },
  {
    part_id: 5,
    name: 'Deity Components Speedway 35 Carbon Riser',
    price: 170,
    quality_type: 'Amazing',
    filename: 'bike_wheels_stock.jpg'
  }
];

const seedSubParts = () => SubPart.bulkCreate(SubPartData);

module.exports = seedSubParts;
