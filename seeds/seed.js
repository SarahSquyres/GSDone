const sequelize = require('../config/connection');
const { User, List } = require('../models');

const userData = require('./userData.json');
const listData = require('./listData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const list of listData) {
      await List.create({
        ...list,
      });
    }
    process.exit(0);
  };

seedDatabase();
