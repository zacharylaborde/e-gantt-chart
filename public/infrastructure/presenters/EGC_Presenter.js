export class EGC_Presenter {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }

    present(newData) {
        this.subscribers.map(s => s.dataDidUpdate(newData))
    }
}