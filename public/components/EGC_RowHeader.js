import {egc_inMemoryGanttChart, egc_rowNameObservers} from "../instance.js";

export class EGC_RowHeader extends HTMLElement {
    constructor(rowId) {
        super();
        this.#applyStyle();
        this.rowId = rowId;
        egc_rowNameObservers.filter(o => o.id === rowId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        this.innerText = egc_inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name;
    }

    #applyStyle() {
        this.style.display = "grid";
        this.style.position = "sticky";
        this.style.left = "0";
    }
}

window.customElements.define('egc-row-header', EGC_RowHeader);