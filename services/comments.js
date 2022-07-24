const Comment = require("../models/comment");
const messages = require("../lib/messages");
const _ = require("lodash");

const getComments = async (req, res) => {
  try {
    const comments = await new Comment()
      .query("orderBy", "timestamp", "DESC")
      .fetchAll({ withRelated: ["author", "likes"] });
    res.send(comments);
    return comments;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const createComment = async (req, res) => {
  try {
    const { authorId, parentId, content } = req.body;
    const comment = new Comment({
      authorId,
      parentId,
      content,
    });
    const result = await comment.save();
    res.send(result);
    return result;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const deleteComment = async (req, res) => {
  // delete comment
};

const getCommentById = async (id) => {
  try {
    const comment = await Comment.where({ id }).fetch({
      withRelated: ["author", "likes"],
    });
    return comment;
  } catch (err) {
    console.error(err);
  }
};

const getParentComments = async (req, res) => {
  try {
    const parentComments = await new Comment()
      .query((qb) => {
        qb.where({ parent_id: null }).orderBy("timestamp", "DESC");
      })
      .fetchAll({
        withRelated: ["author", "likes"],
      });

    res.send(parentComments);
    return parentComments;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const getReplies = async (req, res) => {
  try {
    const replies = await new Comment()
      .query((queryBuilder) => {
        queryBuilder.whereNotNull("parent_id");
      })
      .fetchAll({ withRelated: ["author", "likes"] });
    const groupedReplies = replies.groupBy("parentId");
    res.send(groupedReplies);
    return groupedReplies;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

const getRepliesByParentId = async (req, res) => {
  try {
    const parentId = req.params?.parentId;
    const comments = await new Comment()
      .query("orderBy", "timestamp", "ASC")
      .where({ parent_id: parentId })
      .fetchAll({ withRelated: ["author"] });
    res.send(comments);
    return comments;
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.serverError);
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
  getCommentById,
  getParentComments,
  getReplies,
  getRepliesByParentId,
};
