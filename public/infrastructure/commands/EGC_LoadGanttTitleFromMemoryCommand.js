export class EGC_LoadGanttTitleFromMemoryCommand {
    async execute() {
        try {
            await this.callback(this.repo.state.title);
            this.presenter.present(this.repo.state.title);
        } catch (err) {
            this.errorPresenter.present(err);
            this.presenter.present(this.repo.state.title);
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