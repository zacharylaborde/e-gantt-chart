import {EGC_Component} from "./EGC_Component.js";

export class EGC_DropZoneIndicator extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'drop-zone-indicator')
        this.#applyStyle();
    }

    #applyStyle() {
        this.style.background = "yellow";
        this.style.display = "none";
        this.style.position = 'absolute';
        this.style.top = "0";
        this.style.bottom = "0";
        this.style.pointerEvents = "none";
        this.style.opacity = '20%';
    }
}

window.customElements.define('egc-drop-zone-indicator', EGC_DropZoneIndicator);