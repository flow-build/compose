const fs = require('fs');
const path = require('app-root-path');

function get_configuration() {
    const base_path = path.path;
    const exists = fs.existsSync(`${base_path}/plugin.json`);
    if (!exists) {
        throw Error("plugin file don't exists, use flow-build/plugin-template to create your plugin");
    }
    const json_string = fs.readFileSync(`${base_path}/plugin.json`, 'utf8');
    return JSON.parse(json_string);
}


function get_method(plugin) {
    const base_path = path.path;
    const exists = fs.existsSync(`${base_path}/${plugin.run}`)

    if (!exists) {
        throw Error(`plugin run file ${plugin.run}, don't exists`);
    }
    const method = require(base_path + '/' + plugin.run);

    return new Promise((res, rej) => {
        if (method) {
            res({
                [plugin.type]: method
            });
        } else {
            rej(`run file: ${plugin.run} not found`);
        }
    });
};

module.exports = {
    get_configuration: get_configuration,
    get_method: get_method
}