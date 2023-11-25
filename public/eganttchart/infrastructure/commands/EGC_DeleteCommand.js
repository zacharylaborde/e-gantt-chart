export class EGC_DeleteCommand {
    constructor(...keys) {
        this.keys = keys
    }

    async execute() {
        try {
            const generator = await this.repo.delete(...this.keys);
            const data = generator.next().value;
            generator.next();
            if (this.beforeCallback) await this.beforeCallback(data);
            if (this.observer) this.observer.update(data);
            if (this.afterCallback) await this.afterCallback(data);
            if (this.cleanupCallback) await this.cleanupCallback(data);
        } catch (err) {
            const data = this.repo.getState(this.keys);
            if (this.errorObserver) this.errorObserver.update(err);
            if (this.observer) this.observer.update(data);
            console.error(err.message);
        }
    }

    repo(repo) {
        this.repo = repo;
        return this;
    }

    errorObserver(errorObserver) {
        this.errorObserver = errorObserver;
        return this;
    }

    observer(observer) {
        this.observer = observer;
        return this;
    }

    before(callback) {
        this.beforeCallback = callback;
        return this;
    }

    cleanup(callback) {
        this.cleanupCallback = callback;
        return this;
    }

    after(callback) {
        this.afterCallback = callback;
        return this;
    }
}