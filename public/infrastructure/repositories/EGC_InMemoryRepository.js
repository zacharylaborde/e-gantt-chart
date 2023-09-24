const inMemoryGanttChartRepository = {
    title: "No Title",
    date: "2023-09-26",
    zoom: "day"
}

export class EGC_InMemoryGanttChartRepository {
    constructor(state = inMemoryGanttChartRepository) {
        this.state = state;
    }

    update(key, value) {
        this.state[key] = value;
    }
}