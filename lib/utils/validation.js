const Joi = require('@hapi/joi');

module.exports = (...config) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string()
            .required()
            .valid('middleware',
                'process_notifier',
                'activity_manager_notifier',
                'router'),

        to: Joi.string()
            .required()
            .valid('workflow', 'cockpit'),

        input: Joi.array()
            .items(Joi.object({
                name: Joi.string().required(),
                type: Joi.string().required().valid('string', 'number', 'boolean', 'object'),
                default: Joi.string()
            })),

        run: Joi.string().required()
    }).required();

    if (Array.isArray(config)) {
        config.forEach(module => {
            const result = schema.validate(module);
            if (result.error) {
                throw Error(`your config file has an error: ${result.error.message}`);
            }
        });
    }
}

