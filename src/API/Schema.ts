import Joi from 'joi';

export const SignUpSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
});
export const LogInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
export const CreateRecordSchema = Joi.object({
    date: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    amount: Joi.number().required(),
});
export const UpdateRecordSchema = Joi.object({
    date: Joi.number().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    amount: Joi.number().optional(),
});
