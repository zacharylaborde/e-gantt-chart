import {EGC_Component} from "./EGC_Component.js";

export class EGC_EventNameDisplay extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.setAttribute('part', 'event-name-display');
        this.#applyStyle();
        this.eventId = eventId;
        this.$.eventNameObservers.filter(o => o.id === this.eventId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        this.innerText = this.$.inMemoryGanttChart.getState("events").filter(event => event.id === this.eventId)[0].name;
    }

    #applyStyle() {
        this.style.display = "flex";
        this.style.alignItems = "center";
        this.style.justifyContent = "center";
        this.style.userSelect = "none";
        this.style.pointerEvents = "none";
    }

    disconnectedCallback() {
        this.$.eventNameObservers.filter(o => o.id === this.eventId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-event-name-display', EGC_EventNameDisplay);