import {EGC_DateController} from "./EGC_DateController.js";
import {EGC_ColumnsController} from "./EGC_ColumnsController.js";
import {EGC_TitleController} from "./EGC_TitleController.js";
import {EGC_ZoomController} from "./EGC_ZoomController.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_ControlPanel extends EGC_Component {
    constructor() {
        super();
        this.appendChild(new EGC_TitleController());
        this.appendChild(new EGC_DateController());
        this.appendChild(new EGC_ZoomController());
        this.appendChild(new EGC_ColumnsController());
    }
}

window.customElements.define('egc-control-panel', EGC_ControlPanel);