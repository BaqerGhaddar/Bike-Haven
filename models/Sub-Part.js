const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SubPart extends Model {}

SubPart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'part',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    quality_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'subpart'
  }
);

module.exports = SubPart;
