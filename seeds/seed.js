const sequelize = require('../config/connection');
const { User, List, Comment } = require('../models');
// const { User, List, Task, Comment } = require('../models');

const userData = require('./userData.json');
const listData = require('./listData.json');
// const taskData = require('./taskData.json');
const commentData = require('./commentData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true, dropCascade: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const list of listData) {
    await List.create({
      ...list,
      user_id: users[Math.floor(Math.random() * users.length)].id,
  });
  }

  process.exit(0);
};

seedDatabase();