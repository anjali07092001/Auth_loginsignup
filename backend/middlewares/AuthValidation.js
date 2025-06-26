const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .trim()
            .messages({
                'string.base': '"Name" should be a type of text',
                'string.empty': '"Name" cannot be an empty field',
                'string.min': '"Name" should have a minimum length of {#limit}',
                'string.max': '"Name" should have a maximum length of {#limit}',
                'any.required': '"Name" is a required field'
            }),
        email: Joi.string()
            .email()
            .required()
            .trim()
            .messages({
                'string.base': '"Email" should be a type of text',
                'string.empty': '"Email" cannot be an empty field',
                'string.email': 'Please enter a valid email address',
                'any.required': '"Email" is a required field'
            }),
        password: Joi.string()
            // --- CHANGE MADE HERE ---
            .min(8) // Set minimum password length to 8 characters
            // ------------------------
            .max(100)
            .required()
            .messages({
                'string.base': '"Password" should be a type of text',
                'string.empty': '"Password" cannot be an empty field',
                'string.min': '"Password" should have a minimum length of {#limit} characters', // Custom message for min length
                'string.max': '"Password" should have a maximum length of {#limit} characters',
                'any.required': '"Password" is a required field'
            })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.error('Joi Validation Error (Signup):', error.details[0].message);
        return res.status(400).json({
            message: error.details[0].message,
            success: false
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .trim()
            .messages({
                'string.base': '"Email" should be a type of text',
                'string.empty': '"Email" cannot be an empty field',
                'string.email': 'Please enter a valid email address',
                'any.required': '"Email" is a required field'
            }),
        password: Joi.string()
            .min(4) // You can also adjust this for login if needed, or keep it consistent with signup
            .max(100)
            .required()
            .messages({
                'string.base': '"Password" should be a type of text',
                'string.empty': '"Password" cannot be an empty field',
                'string.min': '"Password" should have a minimum length of {#limit} characters',
                'string.max': '"Password" should have a maximum length of {#limit} characters',
                'any.required': '"Password" is a required field'
            })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.error('Joi Validation Error (Login):', error.details[0].message);
        return res.status(400).json({
            message: error.details[0].message,
            success: false
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};