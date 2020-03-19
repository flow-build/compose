const Context = require('./context');
class Core {
    static get_context() {
        const context = Context.get_context();
        return context.ctx || context.activity_manager || context.proccess_state;
    }

    static get_input(inputName) {
        return Context.get_context().inputs[inputName];
    }

    static set_input(inputName, value) {
        return Context.get_context().inputs[inputName] = value;
    }

    static async next() {
        const context = Context.get_context();
        await context.next();
    }
}

module.exports = Core;