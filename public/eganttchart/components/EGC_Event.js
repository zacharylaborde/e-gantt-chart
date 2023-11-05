import {EGC_Component} from "./EGC_Component.js";
import {EGC_EventNameDisplay} from "./EGC_EventNameDisplay.js";

export class EGC_Event extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.setAttribute('part', 'event');
        this.setAttribute('draggable', 'true');
        this.#applyStyle();
        this.eventId = eventId;
        this.appendChild(new EGC_EventNameDisplay(this.$, this.eventId));
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
        this.$.dateObserver.subscribe(this);
        this.$.eventStartTimeObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
        this.$.eventEndTimeObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
        this.ondragstart = e => {
            e.dataTransfer.setData('text/plain', e.target.eventId);
            e.dataTransfer.effectAllowed = "move";
            this.style.opacity = "20%";
        }
        this.ondragend = _ => this.style.opacity = "100%";
    }

    dataDidUpdate() {
        let startTime = this.$.inMemoryGanttChart.getState('date');
        let endTime = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTime();
        let eventState = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === this.eventId)[0];
        console.log(this.$.inMemoryGanttChart.getState('date').toISOString(), eventState.startTime.toISOString(), eventState.endTime.toISOString());
        let startOfEvent = eventState.startTime >= startTime ? eventState.startTime : startTime;
        let endOfEvent = eventState.endTime <= endTime ? eventState.endTime : endTime;
        let startIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getStartIndex(startOfEvent);
        let endIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndIndex(endOfEvent);
        if (startIndex && endIndex) {
            this.style.display = "grid";
            this.style.gridColumn = `${startIndex} / ${endIndex}`;
        }
        else this.style.display = "none";
    }

    #applyStyle() {
        this.style.backgroundColor = "lightGrey";
        this.style.userSelect = "none";
    }
}

window.customElements.define('egc-event', EGC_Event);