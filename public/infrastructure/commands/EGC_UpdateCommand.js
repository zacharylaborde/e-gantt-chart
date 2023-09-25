export class EGC_UpdateCommand {
    constructor(key) {
        this.key = key;
    }

    async execute(value) {
        try {
            if (this.beforeCallback) await this.beforeCallback(value);
            this.presenter.present(value);
            this.repo.update(this.key, value);
            if (this.afterCallback) await this.afterCallback(value);
        } catch (err) {
            this.errorPresenter.present({value, err});
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