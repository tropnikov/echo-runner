import { celebrate, Joi } from 'celebrate';

export const getTopicReactionsValidation = celebrate(
  {
    params: Joi.object().keys({
      topicId: Joi.number().integer().required(),
    }),
  },
  { convert: true },
);
