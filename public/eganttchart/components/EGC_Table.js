import {EGC_Body} from "./EGC_Body.js";
import {EGC_Timeline} from "./EGC_Timeline.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_Table extends EGC_Component {
    constructor($) {
        super($);
        this.appendChild(new EGC_Timeline(this.$));
        this.appendChild(new EGC_Body(this.$));
        this.#applyStyle();
    }

    #applyStyle() {
        this.setAttribute('part', 'table');
        this.style.display = 'grid';
        this.style.overflowX = 'auto';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-table', EGC_Table);