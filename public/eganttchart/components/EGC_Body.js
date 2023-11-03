import {EGC_Row} from "./EGC_Row.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_Body extends EGC_Component {
    constructor($) {
        super($);
        this.#applyStyle();
        this.$.tableBodyObserver.subscribe(this);
        this.$.inMemoryGanttChart.getState("rows").forEach(row => this.appendChild(new EGC_Row(this.$, row.id)));
    }

    dataDidUpdate() {
        const currentRows = Array.from(this.children);
        const rowsData = this.$.inMemoryGanttChart.getState("rows");
        this.#removeDeletedRows(rowsData);
        rowsData.forEach((rowData, index) => {
            const existingRow = currentRows.find(row => row.rowId === rowData.id);
            if (existingRow) {
                if (this.children[index] !== existingRow)
                    this.insertBefore(existingRow, this.children[index]);
            } else {
                const newRow = new EGC_Row(rowData.id);
                if (this.children[index]) this.insertBefore(newRow, this.children[index]);
                else this.appendChild(newRow);
            }
        });
    }

    #removeDeletedRows(rowsData) {
        Array.from(this.children).forEach(row => {
            const existsInNewData = rowsData.some(data => data.id === row.rowId);
            if (!existsInNewData) this.removeChild(row);
        });
    }

    #applyStyle() {
        this.setAttribute('part', 'body');
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-body', EGC_Body);