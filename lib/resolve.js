const path = require('app-root-path');
const Context = require('./models/context');
const { get_method } = require('./utils/file');

async function resolse(config) {
    let result = [];

    if (Array.isArray(config)) {
        config.forEach(async plugin => {
            const module_promise = get_method(plugin);

            result.push({
                plugin_method: module_promise,
                set_context: Context.set_context,
                set_mext: Context.set_next,
                config: config
            });
        })
    } else {
        const module_promise = get_method(config);
        result = {
            plugin_method: module_promise,
            set_context: Context.set_context,
            set_mext: Context.set_next,
            config: config
        };
    }

    return result;
}

module.exports = resolse;