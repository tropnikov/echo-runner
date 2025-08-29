import { celebrate, Joi } from 'celebrate';

export const createCommentValidation = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
    topicId: Joi.number().integer().required(),
    ownerId: Joi.number().integer().required(),
    ownerLogin: Joi.string().required(),
    replyCommentId: Joi.number().integer(),
  }),
});
