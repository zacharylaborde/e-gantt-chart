export class EGC_UpdateZoomCommand {
    async execute(newZoom) {
        try {
            await this.callback(newZoom);
            this.presenter.present(newZoom);
            this.repo.updateZoom(newZoom);
        } catch (err) {
            this.errorPresenter.present(newZoom, err);
            this.presenter.present(this.repo.state.zoom);
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