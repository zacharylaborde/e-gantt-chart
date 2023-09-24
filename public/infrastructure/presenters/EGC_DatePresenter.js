export class EGC_DatePresenter {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }

    present(newDate) {
        this.subscribers.map(s => s.dateDidUpdate(newDate));
    }
}