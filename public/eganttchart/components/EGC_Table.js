import {EGC_Body} from "./EGC_Body.js";
import {EGC_Timeline} from "./EGC_Timeline.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_Table extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'table');
        this.appendChild(new EGC_Timeline(this.$));
        this.content = document.createElement('div');
        this.$.inMemoryGanttChart.getState('groups').forEach(group => {
            this.content.appendChild(new EGC_Body(this.$, group.id));
        });
        this.appendChild(this.content);
        this.#applyStyle();
    }

    #applyStyle() {
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.overflowX = 'auto';
    }
}

window.customElements.define('egc-table', EGC_Table);