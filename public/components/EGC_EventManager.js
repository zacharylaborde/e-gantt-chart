import {egc_inMemoryGanttChart} from "../instance.js";

export class EGC_EventManager {
    constructor(row) {
        this.row = row;
        this.events = egc_inMemoryGanttChart.getState('events')
            .filter(event => event.parentRowId === row.rowId)
    }

    update() {

    }
}