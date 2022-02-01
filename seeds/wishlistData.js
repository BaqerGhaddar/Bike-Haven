const { Wishlist } = require('../models');

const wishlistData = [
  {
    user_id: 1,
    bike_id: 2,
    part_id: 1
  },
  {
    user_id: 1,
    bike_id: 4,
    part_id: 3
  },
  {
    user_id: 2,
    bike_id: 3,
    part_id: 4
  }
];
const seedwishlist = () => Wishlist.bulkCreate(wishlistData);

module.exports = seedwishlist;
