import { celebrate, Joi } from 'celebrate';

export const getTopicsValidation = celebrate(
  {
    query: Joi.object().keys({
      offset: Joi.number().integer().min(0),
      limit: Joi.number().integer().positive(),
    }),
  },
  { convert: true },
);
