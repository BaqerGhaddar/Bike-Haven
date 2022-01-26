const { Bicycle } = require('../models');

const bikeData = [{
        brand: 'Kona',
        model: 'Dew',
        description: 'The Dew is our classic all-around commuter/townie option for someone looking for an affordable, comfortable ride. The Dew is an efficient bike that features a drivetrain with a broad gear range and integrated brake and shifter levers.',
        stock: 26,
        price: 949.00
    }, {
        brand: 'Kona',
        model: 'Jake the Snake',
        description: 'The working rider`s steed, the Jake the Snake is the go-to bike for Cyclocross racers and hard-core commuters alike. The legendary Jake the Snake features race-driven geometry in a tough yet light aluminum frame and a full carbon flat mount disc fork and is accompanied by tubeless-ready wheels. It’s not your typical sketchy cross bike.',
        stock: 5,
        price: 2499.00
    }, {
        brand: 'Mongoose',
        model: 'Rogue',
        description: 'Commuter bikes like the Rogue combine comfort, utility and style for urban riding. This Mongoose commuter bike features an upright, stylish design with step-through frame, making it easy to get on and off the bike at a traffic light or busy intersection.',
        stock: 17,
        price: 1673.00
    }, {
        brand: 'Schwinn',
        model: 'High Timber ALX 24 Step-Thru',
        description: 'Go exploring with the High Timber ALX Mountain Bike by Schwinn. Ride around the neighborhood, down bike paths, or take on new trails - the High Timber ALX can handle it all.',
        stock: 12,
        price: 539.99
    }, {
        brand: 'Bianchi',
        model: 'Oltre XR4',
        description: 'The Oltre XR4 is a bike driven to perform. Its precision handling, combined with vibration-cancelling Bianchi CV System, provides incomparable control. Perfect power transfer means every watt you push through the pedals takes you closer to the win. If you want it bad enough, the Oltre XR4 is the tool to take you to the top.',
        stock: 3,
        price: 1299.00
    },

];

const seedBikes = () => Bicycle.bulkCreate(bikeData);

module.exports = seedBikes;