const resolve = require('./resolve');
const { get_configuration } = require('./utils/file');
const config_validation = require('./utils/validation');


function compose() {
    try {
        const config = get_configuration();

        if (Array.isArray(config))
            config_validation(...config);
        else
            config_validation(config);

        const composed = async (...input) => {
            const plugin = await resolve(config);
            return {
                plugin,
                input
            }
        };

        return composed;
    } catch (err) {
        throw err.message;
    }
}

module.exports = compose;