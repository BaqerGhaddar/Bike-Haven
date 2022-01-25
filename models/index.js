const User = require("./User");
const Bicycle = require("./Bicycle");
const Bicycle_Comment = require('./Bicycle-Comment');
const Part = require('./Part');
const Part_Comment = require('./Part-Comment');
const Wishlist = require('./Wishlist');

User.hasMany(Part_Comment, {
    foreignKey: 'user_id'
})

Part_Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Bicycle_Comment, {
    foreignKey: 'user_id'
})

Bicycle_Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Bicycle.hasMany(Bicycle_Comment, {
    foreignKey: 'bike_id'
})

Part.hasMany(Part_Comment, {
    foreignKey: 'part_id'
})

Bicycle.belongsToMany(User, {
    through: Wishlist,
    as: 'liked_item',
    foreignKey: 'bike_id'
})

Part.belongsToMany(User, {
    through: Wishlist,
    as: 'liked_item',
    foreignKey: 'part_id'
})

module.exports = { User, Bicycle, Bicycle_Comment, Part, Part_Comment, Wishlist };