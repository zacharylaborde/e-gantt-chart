import { EGC_DateController } from "./EGC_DateController.js";
import { EGC_TitleController } from "./EGC_TitleController.js";
import { EGC_ZoomController } from "./EGC_ZoomController.js";

export class EGC_ControlPanel extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(new EGC_TitleController());
        this.root.appendChild(new EGC_DateController());
        this.root.appendChild(new EGC_ZoomController());
    }
}

window.customElements.define('egc-control-panel', EGC_ControlPanel);