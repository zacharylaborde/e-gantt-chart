import {egc_eventNameObservers} from "../instance.js";

export class EGC_Event extends HTMLElement {
    constructor(eventId) {
        super();
        this.#applyStyle();
        egc_eventNameObservers.filter(o => o.id === eventId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {

    }

    #applyStyle() {

    }
}

window.customElements.define('egc-event', EGC_Event);