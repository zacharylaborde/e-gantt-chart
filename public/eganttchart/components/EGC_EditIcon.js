import {EGC_Component} from "./EGC_Component.js";

export class EGC_EditIcon extends EGC_Component {
    constructor($) {
        super($);
        this.innerHTML = "<?xml version=\"1.0\" ?><svg class=\"feather feather-edit\" fill=\"none\" height=\"24\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>";
        this.#applyStyle();
    }

    #applyStyle() {
        this.style.position = "absolute";
        this.style.bottom = "0";
        this.querySelector('svg').style.width = "75%";
        this.querySelector('svg').style.height = "75%";
    }
}

window.customElements.define('egc-edit-icon', EGC_EditIcon);