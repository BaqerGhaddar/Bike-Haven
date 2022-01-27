const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Part_Comment extends Model {}

Part_Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'part',
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
    modelName: 'part_comment'
  }
);

module.exports = Part_Comment;
