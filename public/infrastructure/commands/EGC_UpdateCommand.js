export class EGC_UpdateCommand {
    constructor(key) {
        this.key = key;
    }

    async execute(value) {
        try {
            await this.callback(value);
            this.presenter.present(value);
            this.repo.update(this.key, value);
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

    callback(callback) {
        this.callback = callback;
        return this;
    }
}