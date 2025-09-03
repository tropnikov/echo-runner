import { celebrate, Joi } from 'celebrate';

export const createCommentValidation = celebrate({
  body: Joi.object().keys({
    text: Joi.string().min(1).required(),
    topicId: Joi.number().integer().positive().required(),
    replyCommentId: Joi.number().integer().positive().optional().allow(null),
  }),
});
