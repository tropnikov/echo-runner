import { celebrate, Joi } from 'celebrate';

export const createTopicValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    ownerId: Joi.number().integer().required(),
    ownerLogin: Joi.string().required(),
  }),
});
