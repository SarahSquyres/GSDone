
const User = require('./User');
const List = require('./List');
// const Comment = require('./Comment');

User.hasMany(List, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  List.belongsTo(User, {
    foreignKey: 'user_id'
  });

  // User.hasMany(Comment, {
  //   foreignKey: 'user_id',
  //   onDelete: 'CASCADE'
  // });

  // Comment.belongsTo(User, {
  //   foreignKey: 'user_id'
  // });

  module.exports = { User, List };
