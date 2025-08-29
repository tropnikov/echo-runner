import { celebrate, Joi } from 'celebrate';

export const getCommentsValidation = celebrate(
  {
    query: Joi.object().keys({
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
      topicId: Joi.number().integer().required(),
    }),
  },
  { convert: true },
);
