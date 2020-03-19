const path = require('app-root-path');
const Context = require('./context');

const resolve_method = (plugin) => {
    return new Promise((res, rej) => {
        const base_path = path.path;
        const method = require(base_path + '/' + plugin.run);
        if (method) {
            res({
                [plugin.type]: method
            });
        } else {
            rej(`run file: ${plugin.run} not found`);
        }
    })
};

async function resolse(config) {
    let result = [];

    if (Array.isArray(config)) {
        config.forEach(async plugin => {
            const module_promise = await resolve_method(plugin);

            result.push({
                module_promise: module_promise,
                set_context: Context.set_context,
                config: config
            });
        })
    } else {
        const module_promise = await resolve_method(config);
        result = {
            module_promise: module_promise,
            set_context: Context.set_context,
            config: config
        };
    }

    return {
        module_promise: result
    }
}

module.exports = resolse;