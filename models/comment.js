const db = require("../data/db");

const Comment = db.model("Comment", {
  tableName: "comments",
  hasTimestamps: ["timestamp", null],
  author() {
    return this.belongsTo("User", "author_id");
  },
  parent() {
    return this.belongsTo("Comment", "parent_id");
  },
  likes() {
    return this.hasMany("CommentLike", "comment_id");
  },
});

module.exports = Comment;
