const express = require('express');

const userRouter = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUserById, updateAvatarByUserId, getCurrentUserInfo,
} = require('../controllers/users');
const { LINK_REGEXP_VALIDATION_STRING } = require('../utils/constants');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUserInfo);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserById);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(LINK_REGEXP_VALIDATION_STRING),
  }),
}), updateAvatarByUserId);

module.exports = userRouter;
