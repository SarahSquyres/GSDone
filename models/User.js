const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //   email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,
    //     validate: {
    //       isEmail: true,
    //     },
    //   },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,

      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,

      },
    },
    {
      //creates and updates a user's password
    //   hooks: {
    //     // POST
    //     beforeCreate: async (newUserData) => {
    //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //       return newUserData;
    //     },
    //     // PUT
    //     beforeUpdate: async (updatedUserData) => {
    //       updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //       return updatedUserData;
    //     },
    //   },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  

module.exports = User;