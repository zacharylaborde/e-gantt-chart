export class EGC_InMemoryRepository {
    constructor(state) {
        this.state = state;
    }

    update(key, value) {
        this.state[key] = value;
    }

    getState(key) {
        return this.state[key];
    }
}