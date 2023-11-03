import {EGC_Component} from "./EGC_Component.js";

export class EGC_RowHeader extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.#applyStyle();
        this.rowId = rowId;
        this.onblur = () => this.$.updateRowNameCommands.filter(c => c.id === this.rowId)[0].command.execute(this.innerText);
        this.$.rowNameObservers.filter(o => o.id === this.rowId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        this.innerText = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name;
    }

    #applyStyle() {
        this.style.display = "grid";
        this.style.position = "sticky";
        this.style.left = "0";
        this.contentEditable = "true";
    }
}

window.customElements.define('egc-row-header', EGC_RowHeader);