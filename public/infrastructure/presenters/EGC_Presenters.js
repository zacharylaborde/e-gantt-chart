class EGC_Presenter {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }
}

export class EGC_TitlePresenter extends EGC_Presenter {
    present(newTitle) {
        this.subscribers.map(s => s.titleDidUpdate(newTitle));
    }
}

export class EGC_ZoomPresenter extends EGC_Presenter {
    present(newTitle) {
        this.subscribers.map(s => s.zoomDidUpdate(newTitle));
    }
}

export class EGC_ErrorPresenter extends EGC_Presenter {
    present(errorData, err) {
        this.subscribers.map(s => s.errorDidOccur(errorData, err));
    }
}

export class EGC_DatePresenter extends EGC_Presenter {
    present(newDate) {
        this.subscribers.map(s => s.dateDidUpdate(newDate));
    }
}