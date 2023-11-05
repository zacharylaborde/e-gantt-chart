import {EGC_Component} from "./EGC_Component.js";

export class EGC_MessageBox extends EGC_Component {
    constructor($) {
        super($);
    }
}

window.customElements.define('egc-message-box', EGC_MessageBox);