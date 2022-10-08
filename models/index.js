const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Post, {
  foreignKey: 'userId',
});

Comment.belongsTo(Post, {
  foreignKey: 'commentPostId',
});

Post.hasMany(Comment, {
  foreignKey: 'commentPostId',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

module.exports = { User, Post, Comment };
