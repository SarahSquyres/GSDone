
const User = require('./User');
const List = require('./List');
// const Task = require('./Task');
const Comment = require('./Comment');

User.hasMany(List, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  // User.hasMany(Task, {
  //   foreignKey: 'user_id',
  //   onDelete: 'CASCADE'
  // });
  
  List.belongsTo(User, {
    foreignKey: 'user_id'
  });

  // List.hasMany(Task, {
  //   foreignKey: 'list_id',
  //   onDelete: 'CASCADE'
  // });

  // Task.belongsTo(List, {
  //   foreignKey: 'list_id'
  // });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

  module.exports = { User, List, Comment };
  // module.exports = { User, List, Task, Comment };