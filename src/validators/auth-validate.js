const Joi = require("joi");

const registerSchema = Joi.object({
  memberName: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(/^[0-9]{5,15}$/)
    .trim()
    .required(),
  confirmpassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim(),
});

exports.loginSchema = loginSchema;
