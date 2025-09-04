import { celebrate, Joi } from 'celebrate';

export const getTopicReactionsValidation = celebrate(
  {
    params: Joi.object().keys({
      topicId: Joi.number().integer().required(),
    }),
    query: Joi.object().keys({
      ownerId: Joi.number().integer(),
    }),
  },
  { convert: true },
);
