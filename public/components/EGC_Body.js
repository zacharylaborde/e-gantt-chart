import { egc_inMemoryGanttChart, egc_tableBodyObserver } from "../instance.js";
import { EGC_Row } from "./EGC_Row.js";

export class EGC_Body extends HTMLElement {
    constructor() {
        super();
        this.#applyStyle();
        egc_tableBodyObserver.subscribe(this);
    }

    dataDidUpdate() {
        egc_inMemoryGanttChart.getState("rows").forEach(row => {
            if (Array.from(this.children).some(elem => elem.rowId === row.id)) return
            const e = new EGC_Row(row.id)
            this.appendChild(e);
        })
    }

    #applyStyle() {
        this.setAttribute('part', 'body');
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-body', EGC_Body);