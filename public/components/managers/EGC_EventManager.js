import {
    egc_dateObserver,
    egc_inMemoryGanttChart,
    egc_zoomObserver,
    egc_zoomService
} from "../../instance.js";

export class EGC_EventManager {
    constructor(row) {
        this.row = row;
        this.events = egc_inMemoryGanttChart.getState('events')
            .filter(event => event.parentRowId === row.rowId)
        egc_dateObserver.subscribe(this);
        egc_zoomObserver.subscribe(this);
    }

    dataDidUpdate() {
        let startDate = egc_inMemoryGanttChart.getState('date');
        let endDate = egc_zoomService[egc_inMemoryGanttChart.getState('zoom')].getEndTime();
    }
}