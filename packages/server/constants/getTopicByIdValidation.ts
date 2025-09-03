import { celebrate, Joi } from 'celebrate';

export const getTopicByIdValidation = celebrate(
  {
    params: Joi.object().keys({
      topicId: Joi.number().integer().positive().required(),
    }),
  },
  { convert: true },
);
