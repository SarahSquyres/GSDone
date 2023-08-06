const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class List extends Model {}

// TODO: Either remove list_body)
// or have it allowNull: true
// Either way, you need to re-seed

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

          list_body:{
            type: DataTypes.STRING,
            allowNull: true,
          },

          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
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

// add user to associate with list and tasks