export class EGC_LoadDateFromMemoryCommand {
    async execute() {
        try {
            await this.callback(this.repo.state.date);
            this.presenter.present(this.repo.state.date);
        } catch (err) {
            this.errorPresenter.present(err);
            this.presenter.present(this.repo.state.date);
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