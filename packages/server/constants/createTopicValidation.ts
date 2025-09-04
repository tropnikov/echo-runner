import { celebrate, Joi } from 'celebrate';

export const createTopicValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(1).required(),
  }),
});
