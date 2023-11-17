import {EGC_Component} from "./EGC_Component.js";

export class EGC_EventEditor extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'event-editor');
        this.#applyStyle();
        this.onmousedown = this.#onmousedown;
        this.$.selectedEventObserver.subscribe(this);
    }

    dataDidUpdate() {
        const event = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === this.$.inMemoryGanttChart.getState('selectedEvent'))[0];
        this.style.right = event ? "0" : "-100%";
    }

    #onmousedown(e) {
        e.preventDefault();
    }

    #applyStyle() {
        this.style.position = "absolute";
        this.style.width = "25%";
        this.style.height = "100%";
        this.style.zIndex = "2"
        this.style.right = "-100%";
    }
}

window.customElements.define('egc-event-editor', EGC_EventEditor);