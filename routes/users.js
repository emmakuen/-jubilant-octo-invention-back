const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const userService = require("../services/users");

const getUserSchema = Joi.object({
  id: Joi.number().required(),
});

router.route("/").get(userService.getUsers);
router.route("/:id").get(validator.params(getUserSchema), userService.getUser);

module.exports = router;
