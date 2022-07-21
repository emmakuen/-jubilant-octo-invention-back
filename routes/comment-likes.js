const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const commentLikesService = require("../services/comment-likes");

const commentSchema = Joi.object({
  commentId: Joi.number().required(),
  userId: Joi.number().required(),
});

router
  .route("/")
  .get(commentLikesService.getLikesByComment)
  .post(validator.body(commentSchema), commentLikesService.toggleCommentLike);

module.exports = router;
