// Standard require to bring all models
const user = require("./user");
const comment = require("./comment");
const blogPost = require("./blogPost");

// User has many posts
user.hasMany(blogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Posts belong to user
blogPost.belongsTo(user, {
  foreignKey: "user_id",
});

// User has many comments
user.hasMany(comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belongs to blogPost
comment.belongsTo(blogPost, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// Posts have many comments
blogPost.hasMany(comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// Comment belongs to user
comment.belongsTo(user, {
  foreignKey: "user_id",
});

module.exports = {
  blogPost,
  comment,
  user,
};
