const User = require('./User');
const Bicycle = require('./Bicycle');
const Bicycle_Comment = require('./Bicycle-Comment');
const Part = require('./Part');
const Part_Comment = require('./Part-Comment');
const Wishlist = require('./Wishlist');

User.hasMany(Part_Comment, {
  foreignKey: 'user_id'
});

Part_Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Bicycle_Comment, {
  foreignKey: 'user_id'
});

Bicycle_Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Bicycle.hasMany(Bicycle_Comment, {
  foreignKey: 'bike_id'
});

Part.hasMany(Part_Comment, {
  foreignKey: 'part_id'
});

Bicycle.belongsTo(User, {
  through: Wishlist,
  as: 'liked_bike',
  foreignKey: 'bike_id'
});

User.belongsToMany(Bicycle, {
  through: Wishlist,
  as: 'liked_item',
  foreignKey: 'user_id'
});

Part.belongsTo(User, {
  through: Wishlist,
  as: 'liked_part',
  foreignKey: 'part_id'
});

User.belongsToMany(Part, {
  through: Wishlist,
  as: 'liked_part',
  foreignKey: 'user_id'
});

User.hasOne(Wishlist, {
  foreignKey: 'user_id'
});

Wishlist.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

module.exports = {
  User,
  Bicycle,
  Bicycle_Comment,
  Part,
  Part_Comment,
  Wishlist
};
