import { egc_inMemoryGanttChart, egc_tableBodyObserver } from "../instance.js";
import { EGC_Row } from "./EGC_Row.js";

export class EGC_Body extends HTMLElement {
    constructor() {
        super();
        this.#applyStyle();
        egc_tableBodyObserver.subscribe(this);
    }

    dataDidUpdate() {
        const currentRows = Array.from(this.children);
        const rowsData = egc_inMemoryGanttChart.getState("rows");
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
        Array.from(this.children).forEach(row => {
            const existsInNewData = rowsData.some(data => data.id === row.id);
            if (!existsInNewData) {
                this.removeChild(row);
            }
        });
    }

    #applyStyle() {
        this.setAttribute('part', 'body');
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-body', EGC_Body);