const inMemoryGanttChart = {
    title: "No Title",
    date: "2023-09-26",
    zoom: "day"
}

export class EGC_InMemoryRepository {
    constructor(state = inMemoryGanttChart) {
        this.state = state;
    }

    update(key, value) {
        this.state[key] = value;
    }
}