export class EGC_LoadFromMemoryCommand {
    constructor(key) {
        this.key = key;
    }

    async execute() {
        try {
            if (this.beforeCallback) await this.beforeCallback(this.repo.state[this.key]);
            this.presenter.present(this.repo.state[this.key]);
            if (this.afterCallback) await this.afterCallback(this.repo.state[this.key]);
        } catch (err) {
            this.errorPresenter.present(err);
            this.presenter.present(this.repo.state[this.key]);
            console.error(err.message);
        } 
    }

    repo(repo) {
        this.repo = repo;
        return this;
    }

    errorPresenter(errorPresenter) {
        this.errorPresenter = errorPresenter;
        return this;
    }

    presenter(presenter) {
        this.presenter = presenter;
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