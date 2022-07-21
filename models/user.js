const db = require("../data/db");
const Comment = require("./comment");
const CommentLike = require("./comment-like");

const User = db.model("User", {
  tableName: "users",
  comments() {
    return this.hasMany(Comment);
  },
  commentLikes() {
    return this.hasMany(CommentLike);
  },
});

module.exports = User;
