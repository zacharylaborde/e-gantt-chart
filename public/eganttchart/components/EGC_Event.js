import {EGC_Component} from "./EGC_Component.js";
import {EGC_EventNameDisplay} from "./EGC_EventNameDisplay.js";

export class EGC_Event extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.#applyStyle();
        this.eventId = eventId;
        let eventState = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === this.eventId)[0];
        this.setAttribute('part', eventState.code ? `event-${eventState.code}` : 'event');
        this.appendChild(new EGC_EventNameDisplay(this.$, this.eventId));
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
        this.$.dateObserver.subscribe(this);
        this.$.eventStartTimeObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
        this.$.eventObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
        this.$.eventEndTimeObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
        this.$.selectedEventObserver.subscribe(this);
        this.ondragstart = this.#ondragstart;
        this.ondragend = this.#ondragend;
        this.onfocus = this.#onfocus;
        this.onblur = this.#onblur;
        this.tabIndex = 0;
    }

    dataDidUpdate() {
        let eventState = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === this.eventId);
        if (eventState.length === 0) {
            this.blur();
            this.remove();
            return;
        } else {
            eventState = eventState[0];
        }
        let startTime = this.$.inMemoryGanttChart.getState('date');
        let endTime = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTime();
        this.setAttribute('draggable', `${!eventState.disabled}`);
        let startOfEvent = eventState.startTime >= startTime ? eventState.startTime : startTime;
        let endOfEvent = eventState.endTime <= endTime ? eventState.endTime : endTime;
        let startIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getStartIndex(startOfEvent);
        let endIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndIndex(endOfEvent);
        if (startIndex && endIndex > 2) {
            this.style.display = "grid";
            this.style.gridColumn = `${startIndex} / ${endIndex}`;
        }
        else this.style.display = "none";
        this.setAttribute('part', eventState.disabled ? 'event-disabled' : 'event');
        this.setAttribute('part', eventState.code ? `${this.getAttribute('part')}-${eventState.code}` : this.getAttribute('part'));
        this.setAttribute('part', this.$.inMemoryGanttChart.getState('selectedEvent') === this.eventId ? `${this.getAttribute('part')}-selected` : this.getAttribute('part'));
    }

    #applyStyle() {
        this.style.backgroundColor = "lightGrey";
        this.style.userSelect = "none";
    }

    #ondragstart(e) {
        this.blur();
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: e.target.eventId,
        }));
        this.$.dragStartPosition = e.clientX - this.getBoundingClientRect().left;
        this.$.draggableWidth = this.getBoundingClientRect().width;
        e.dataTransfer.effectAllowed = e.shiftKey ? "copy" : "move";
        this.style.opacity = "20%";
    }

    #onfocus() {
        this.$.updateSelectedEventCommand.execute(this.eventId);
        this.onkeydown = this.#onkeydown;
    }

    #onblur() {
        this.$.updateSelectedEventCommand.execute(null);
        this.onkeydown = null;
    }

    #ondragend() {
        this.style.opacity = "100%";
    }

    #onkeydown(e) {
        e.preventDefault();
        if (e.key === "Delete") {
            this.$.deleteEventCommands.filter(c => c.id === this.eventId)[0].command.execute();
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            console.log("The event will move right");
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            console.log("The event will move left");
        } else if (e.key === "Escape") {
            this.blur();
        }
    }

    disconnectedCallback() {
        this.$.numColumnsToLoadObserver.unsubscribe(this);
        this.$.columnWidthObserver.unsubscribe(this);
        this.$.dateObserver.unsubscribe(this);
        this.$.eventStartTimeObservers.filter(o => o.id === this.eventId)[0].observer.unsubscribe(this);
        this.$.eventEndTimeObservers.filter(o => o.id === this.eventId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-event', EGC_Event);