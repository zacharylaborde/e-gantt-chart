import {
    egc_dateObserver,
    egc_inMemoryGanttChart, egc_numColumnsToLoadObserver,
    egc_zoomObserver,
    egc_zoomService
} from "../../instance.js";

export class EGC_EventManager {
    constructor(row) {
        this.row = row;
        this.#placeEvents();
        egc_dateObserver.subscribe(this);
        egc_zoomObserver.subscribe(this);
        egc_numColumnsToLoadObserver.subscribe(this);
    }

    dataDidUpdate() {
        this.#placeEvents();
    }

    #placeEvents() {
        let startTime = egc_inMemoryGanttChart.getState('date');
        let endTime = egc_zoomService[egc_inMemoryGanttChart.getState('zoom')].getEndTime();
        this.events = egc_inMemoryGanttChart.getState('events')
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