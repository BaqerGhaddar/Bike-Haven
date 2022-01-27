const { Part } = require('../models');

const partData = [{
        type: 'Bike Rack',
        stock: 57,
        price: 129.00
    }, {
        type: 'Adjustable Kickstand',
        stock: 42,
        price: 44.00
    }, {
        type: 'Flat Pedals',
        stock: 158,
        price: 129.00
    }, {
        type: 'LED Handlebar Headlight',
        stock: 110,
        price: 61.00
    }, {
        type: 'Hand Pump',
        stock: 26,
        price: 57.00
    },

];

const seedParts = () => Part.bulkCreate(partData);

module.exports = seedParts;