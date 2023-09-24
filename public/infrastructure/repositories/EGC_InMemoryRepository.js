const inMemoryGanttChart = {
    title: "No Title",
    date: "2023-09-26"
}

export class EGC_InMemoryRepository {
    constructor(state = inMemoryGanttChart) {
        this.state = state;
    }

    updateTitle(newTitle) {
        this.state.title = newTitle;
    }

    updateDate(newDate) {
        this.state.date = newDate;
    }
}