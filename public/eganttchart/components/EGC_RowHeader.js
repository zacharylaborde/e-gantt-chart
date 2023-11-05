import {EGC_Component} from "./EGC_Component.js";

export class EGC_RowHeader extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.setAttribute('part', 'row-header');
        this.#applyStyle();
        this.rowId = rowId;
        this.$.rowNameObservers.filter(o => o.id === this.rowId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        this.innerText = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name;
    }

    #applyStyle() {
        this.style.display = "grid";
        this.style.position = "sticky";
        this.style.left = "0";
        this.style.alignItems = "center";
    }
}

window.customElements.define('egc-row-header', EGC_RowHeader);