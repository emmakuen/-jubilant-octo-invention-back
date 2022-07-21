const db = require("../data/db");
const Comment = require("./comment");
const User = require("./user");

const CommentLike = db.model("CommentLike", {
  tableName: "comment_likes",
  comment() {
    return this.belongsTo(Comment, "comment_id");
  },

  user() {
    return this.belongsTo(User, "user_id");
  },
});

module.exports = CommentLike;
