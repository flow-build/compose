const fs = require('fs');
const path = require('app-root-path');
const Joi = require('@hapi/joi');
const resolve = require('./resolve');

function get_configuration() {
    const base_path = path.path;
    const exists = fs.existsSync(`${base_path}/plugin.json`);
    if (!exists) {
        throw Error("plugin file don't exists, use flow-build/plugin-template to create your plugin");
    }
    const json_string = fs.readFileSync(`${base_path}/plugin.json`, 'utf8');

    const config = JSON.parse(json_string);
    return config;
}

function config_validation(...config) {
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

function compose() {
    try {
        const config = get_configuration();

        if (Array.isArray(config))
            config_validation(...config);
        else
            config_validation(config);

        const composed = async (...input) => {
            const promise_method = await resolve(config);
            return {
                promise_method,
                input
            }
        };

        return composed;
    } catch (err) {
        throw err.message;
    }
}

module.exports = compose;