import {EGC_Component} from "./EGC_Component.js";
import {EGC_EventNameDisplay} from "./EGC_EventNameDisplay.js";

export class EGC_Event extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.setAttribute('part', 'event');
        this.#applyStyle();
        this.eventId = eventId;
        this.appendChild(new EGC_EventNameDisplay(this.$, this.eventId));
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
        this.$.dateObserver.subscribe(this);
    }

    dataDidUpdate() {
        let startTime = this.$.inMemoryGanttChart.getState('date');
        let endTime = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTime();
        let eventState = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === this.eventId)[0];
        let startOfEvent = eventState.startTime >= startTime ? eventState.startTime : startTime;
        let endOfEvent = eventState.endTime <= endTime ? eventState.endTime : endTime;
        if (startOfEvent > endOfEvent) throw Error(`Event ${this.eventId}'s ends before it starts.`);
        let startIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getStartIndex(startOfEvent);
        let endIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndIndex(endOfEvent);
        this.style.gridColumn = `${startIndex} / ${endIndex}`;
    }

    #applyStyle() {
        this.style.display = "grid";
        this.style.backgroundColor = "green";
        this.style.width = this.$.inMemoryGanttChartSettings.getState('columnWidth')
    }
}

window.customElements.define('egc-event', EGC_Event);