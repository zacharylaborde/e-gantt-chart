export class EGC_Observer {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.remove(subscriber);
    }

    update() {
        this.subscribers.map(s => s.dataDidUpdate())
    }
}