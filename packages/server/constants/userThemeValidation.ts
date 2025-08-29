import Joi from 'joi';

export const getUserThemeSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

export const setUserThemeSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  theme: Joi.string().valid('light', 'dark').required(),
});
