const sequelize = require('../config/connection');
const { User, List, Task } = require('../models');

const userData = require('./userData.json');
const listData = require('./listData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true, dropCascade: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const list of listData) {
    await List.create({
      ...list,
    });
  };

  for (const task of taskData) {
    const newTask = await Task.create({
      ...task,

    });
  }

  process.exit(0);
};

seedDatabase();