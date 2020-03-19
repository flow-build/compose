class Context {

    static get_context() {
        return Context._context;
    };

    static set_context(ctx) {
        new Context(ctx, true);
        return Context.get_context;
    };

    static set_next(next) {
        Context._next = next;
    }

    constructor(ctx = undefined, force = false) {
        this.ctx = ctx;
        if (!Context._context || force) {
            Context._context = this;
        }
    }
}

module.exports = Context;

