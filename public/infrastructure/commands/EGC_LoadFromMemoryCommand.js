export class EGC_LoadFromMemoryCommand {
    constructor(key) {
        this.key = key;
    }

    async execute() {
        try {
            await this.callback(this.repo.state[this.key]);
            this.presenter.present(this.repo.state[this.key]);
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

    callback(callback) {
        this.callback = callback;
        return this;
    }
}