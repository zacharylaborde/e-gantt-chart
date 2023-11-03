import {EGC_Component} from "./EGC_Component.js";

export class EGC_EventNameDisplay extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.#applyStyle();
        this.$.eventNameObservers.filter(o => o.id === eventId)[0].observer.subscribe(this);
        this.eventId = eventId;
    }

    dataDidUpdate() {
        this.innerText = this.$.inMemoryGanttChart.getState("events").filter(event => event.id === this.eventId)[0].name;
    }

    #applyStyle() {
        this.style.display = "flex";
        this.style.alignItems = "center";
        this.style.justifyContent = "center";
    }
}

window.customElements.define('egc-event-name-display', EGC_EventNameDisplay);