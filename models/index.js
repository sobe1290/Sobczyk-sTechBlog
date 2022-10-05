const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'authorUserId'
})

User.hasMany(Post, {
    foreignKey: 'authorUserId'
})

Comment.belongsTo(Post, {
    foreignKey: 'commentPostId'
})

Post.hasMany(Comment,{
    foreignKey: 'commentPostId'
})

Comment.belongsTo(User, {
    foreignKey: 'commentUserId'
})

User.hasMany(Comment, {
    foreignKey: 'commentUserId'
})


module.exports = { User, Post, Comment };
