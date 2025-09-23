import { celebrate, Joi } from 'celebrate';

export const createTopicReactionValidation = celebrate(
  {
    params: Joi.object().keys({
      topicId: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
      emoji: Joi.string().max(64).required(),
    }),
  },
  { convert: true },
);
