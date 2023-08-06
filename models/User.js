const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.userPassword);
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
    userUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },



    //   email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,
    //     validate: {
    //       isEmail: true,
    //     },
    //   },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
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
    hooks: {
      // POST
      beforeCreate: async (newUserData) => {
        newUserData.userPassword = await bcrypt.hash(newUserData.userPassword, 10);
        return newUserData;
      },
      // PUT
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.userPassword = await bcrypt.hash(
          updatedUserData.userPassword,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
