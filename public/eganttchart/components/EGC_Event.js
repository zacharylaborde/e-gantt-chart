import {EGC_Component} from "./EGC_Component.js";

export class EGC_Event extends EGC_Component {
    constructor($, eventId) {
        super($);
        this.#applyStyle();
        this.$.eventNameObservers.filter(o => o.id === eventId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {

    }

    #applyStyle() {

    }
}

window.customElements.define('egc-event', EGC_Event);