export class EGC_LoadCommand {
    constructor(key) {
        this.key = key;
    }

    async execute() {
        try {
            const data = this.repo.state[this.key];
            if (this.beforeCallback) await this.beforeCallback(data);
            if (this.presenter) this.presenter.present(data);
            if (this.afterCallback) await this.afterCallback(data);
        } catch (err) {
            const data = this.repo.state[this.key];
            if (this.errorPresenter) this.errorPresenter.present(err);
            if (this.presenter) this.presenter.present(data);
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