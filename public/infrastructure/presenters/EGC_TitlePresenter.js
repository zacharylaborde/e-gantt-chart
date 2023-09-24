export class EGC_TitlePresenter {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }

    present(newTitle) {
        this.subscribers.map(s => s.titleDidUpdate(newTitle));
    }
}