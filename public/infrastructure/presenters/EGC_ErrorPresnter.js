export class EGC_ErrorPresenter {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }

    present(errorData, err) {
        this.subscribers.map(s => s.errorDidOccur(errorData, err));
    }
}