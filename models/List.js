const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class List extends Model {}

List.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          list_name: {
            type: DataTypes.STRING,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'list',
      }
    );

module.exports = List;