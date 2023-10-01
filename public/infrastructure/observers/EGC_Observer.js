export class EGC_Observer {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.pop(subscriber);
    }

    update() {
        this.subscribers.map(s => s.dataDidUpdate())
    }
}