const inMemoryGanttChart = {
    title: "No Title"
}

export class EGC_InMemoryRepository {
    constructor(state = inMemoryGanttChart) {
        this.state = state;
    }

    updateTitle(newTitle) {
        this.state.title = newTitle;
    }
}