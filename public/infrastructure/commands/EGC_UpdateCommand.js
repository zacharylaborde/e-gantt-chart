export class EGC_UpdateCommand {
    constructor(...keys) {
        this.keys = keys
    }

    async execute(value) {
        try {
            if (this.beforeCallback) await this.beforeCallback(value);
            this.repo.update([...this.keys], value);
            if (this.observer) this.observer.update(value);
            if (this.afterCallback) await this.afterCallback(value);
        } catch (err) {
            this.errorObserver.update({value, err});
            this.observer.update(this.repo.getState(this.key));
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

    after(callback) {
        this.beforeCallback = callback;
        return this;
    }
}