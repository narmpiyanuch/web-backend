const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma");
const { registerSchema, loginSchema } = require("../validators/auth-validate");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 11);
    const user = await prisma.member.create({
      data: value,
    });
    const payload = { memberId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECERT_KEY || "qwertyuioas",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const user = await prisma.member.findFirst({
      where: {
        email: value.email,
      },
    });
    if (!user) {
      const error = new Error("Not found user");
      error.statusCode = 400;
      return next(error);
    }
    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (!isPasswordMatch) {
      const error = new Error("Password invalid");
      error.statusCode = 400;
      return next(error);
    }
    const payload = { memberId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECERT_KEY || "qwertyuioas",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
