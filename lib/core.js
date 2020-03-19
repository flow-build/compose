const Context = require('./context');
class Core {
    static get_context() {
        const context = Context.get_context();
        return context.ctx || context.activity_manager || context.proccess_state;
    }

    static get_input(inputName) {
        return Context.get_context().ctx.inputs[inputName];
    }

    static set_input(inputName, value) {
        return Context.get_context().ctx.inputs[inputName] = value;
    }

    static set_next(next) {
        const context = Context.get_context();
        context._next = next;
    }

    static async next() {
        const context = Context.get_context();
        await context._next();
    }
}

module.exports = Core;