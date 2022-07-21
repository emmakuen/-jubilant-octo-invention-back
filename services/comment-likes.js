const CommentLike = require("../models/comment-like");
const messages = require("../lib/messages");

const getLikesByComment = async (req, res) => {
  try {
    const commentLikes = (await CommentLike.fetchAll()).groupBy("commentId");
    res.send(commentLikes);
    return commentLikes;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const toggleCommentLike = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    // check if user has already liked the comment
    const existingCommentLike = await CommentLike.where({
      comment_id: commentId,
      user_id: userId,
    }).fetch();

    // delete if there's like
    if (existingCommentLike) {
      const result = await existingCommentLike.destroy();
      res.send("Unliked the comment...");
      return result;
    }

    // create new if there's no like
    const commentLike = new CommentLike({ commentId, userId });
    const result = await commentLike.save();
    res.send(result);
    return result;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

module.exports = {
  getLikesByComment,
  toggleCommentLike,
};
