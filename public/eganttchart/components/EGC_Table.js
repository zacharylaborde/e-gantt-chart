import {EGC_Body} from "./EGC_Body.js";
import {EGC_Timeline} from "./EGC_Timeline.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_Table extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'table');
        this.appendChild(new EGC_Timeline(this.$));
        this.$.inMemoryGanttChart.getState('groups').forEach(group => {
            this.appendChild(new EGC_Body(this.$, group.id));
        })
        this.#applyStyle();
    }

    #applyStyle() {
        this.style.display = 'grid';
        this.style.overflowX = 'auto';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-table', EGC_Table);