import Joi from 'joi';

export const getUserThemeSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

export const setUserThemeSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  theme: Joi.string().trim().min(1).max(50).required(),
});
