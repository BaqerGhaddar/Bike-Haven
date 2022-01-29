const { Wishlist } = require('../models');

const wishlistData = [
  {
    user_id: 1,
    bike_id: 2,
    part_id: 1
  }
];
const seedwishlist = () => Wishlist.bulkCreate(wishlistData);

module.exports = seedwishlist;
