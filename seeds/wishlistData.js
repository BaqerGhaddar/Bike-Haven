const { Wishlist } = require('../models');

const wishlistData = [
  {
    user_id: 1,
    bike_id: 4,
    part_id: 1
  }
];
const seedwishlist = () => Wishlist.bulkCreate(wishlistData);

module.exports = seedwishlist;
