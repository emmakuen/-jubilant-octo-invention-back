const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const commentService = require("../services/comments");

const postCommentSchema = Joi.object({
  authorId: Joi.number().required(),
  parentId: Joi.number().allow(null),
  content: Joi.string().required(),
});

const getCommentSchema = Joi.object({
  id: Joi.number().required(),
});

const getCommentsByParentIdSchema = Joi.object({
  parentId: Joi.number().required(),
});

router
  .route("/")
  .get(commentService.getComments)
  .post(validator.body(postCommentSchema), commentService.createComment);

router.route("/parents").get(commentService.getParentComments);

router.route("/replies").get(commentService.getReplies);
router
  .route("/replies/:parentId")
  .get(
    validator.params(getCommentsByParentIdSchema),
    commentService.getRepliesByParentId
  );

router
  .route("/:id")
  .get(validator.params(getCommentSchema), commentService.getCommentById);

module.exports = router;
