export class EGC_EventManager {
    constructor(row) {
        this.row = row;
    }

    connectedCallback() {
        this.row.getRootNode().egc.dateObserver.subscribe(this);
        this.row.getRootNode().egc.zoomObserver.subscribe(this);
        this.row.getRootNode().egc.numColumnsToLoadObserver.subscribe(this);
        this.#placeEvents();
    }

    dataDidUpdate() {
        this.#placeEvents();
    }

    #placeEvents() {
        let startTime = this.row.getRootNode().egc.inMemoryGanttChart.getState('date');
        let endTime = this.row.getRootNode().egc.zoomService[this.row.getRootNode().egc.inMemoryGanttChart.getState('zoom')].getEndTime();
        this.events = this.row.getRootNode().egc.inMemoryGanttChart.getState('events')
            .filter(event => (
                event.parentRowId === this.row.rowId
                && !(event.startTime >= endTime)
                && !(event.endTime <= startTime)
            ))
        // Clip off the ends of the dates to fit inside the gantt chart.
        // place the events in the table where they belong (Place the event at the start date; it's width should be calculated via start and end dates).
        // add flag to determine if the event goes off-screen. (This will be used to inform the user later).
    }
}