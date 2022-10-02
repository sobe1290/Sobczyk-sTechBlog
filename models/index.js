const User = require('./User');
const Post = require('./Post');

Post.belongsTo(User, {
    foreignKey: 'authorUserId'
})

User.hasMany(Post,{
    foreignKey: 'authorUserId'
})

module.exports = { User, Post };
