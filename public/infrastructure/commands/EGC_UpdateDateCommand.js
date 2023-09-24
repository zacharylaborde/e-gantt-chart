export class EGC_UpdateDateCommand {
    async execute(newDate) {
        try {
            await this.callback(newDate);
            this.presenter.present(newDate);
            this.repo.updateDate(newDate);
        } catch (err) {
            this.errorPresenter.present(newDate, err);
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