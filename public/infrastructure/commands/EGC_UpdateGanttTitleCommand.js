export class EGC_UpdateGanttTitleCommand {
    async execute(newTitle) {
        try {
            await this.callback(newTitle);
            this.presenter.present(newTitle);
            this.repo.updateTitle(newTitle);
        } catch (err) {
            this.errorPresenter.present(newTitle, err);
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