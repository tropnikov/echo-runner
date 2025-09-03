import { celebrate, Joi } from 'celebrate';

export const getCommentsValidation = celebrate({
  query: Joi.object().keys({
    offset: Joi.number().integer().min(0),
    limit: Joi.number().integer().positive(),
    topicId: Joi.number().integer().positive().required(),
  }),
});
