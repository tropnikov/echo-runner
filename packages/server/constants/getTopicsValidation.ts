import { celebrate, Joi } from 'celebrate';

export const getTopicsValidation = celebrate(
  {
    query: Joi.object().keys({
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
    }),
  },
  { convert: true },
);
