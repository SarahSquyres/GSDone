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
    });
  };

  // for (const task of taskData) {
  //   const newTask = await Task.create({
  //     ...task,

  //   });
  // }

  for (const comment of commentData) {
    const newComment = await Comment.create({
      ...comment,

    });
  }

  process.exit(0);
};

seedDatabase();