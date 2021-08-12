// Standard require to bring all models
const User = require("./User");
const Comment = require("./Comment");
const BlogPost = require("./BlogPost");

// User has many posts
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Posts belong to user
BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belongs to blogPost
Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// Posts have many comments
BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// Comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  BlogPost,
  Comment,
  User,
};
