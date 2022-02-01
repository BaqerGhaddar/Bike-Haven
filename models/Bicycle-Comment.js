const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bicycle_Comment extends Model {}

Bicycle_Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bicycle',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bicycle_comment'
  }
);

module.exports = Bicycle_Comment;
