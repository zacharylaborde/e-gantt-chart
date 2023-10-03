import { egc_inMemoryGanttChart, egc_rowLoadingObserver } from "../instance.js";

export class EGC_Body extends HTMLElement {
    constructor() {
        super();
        this.#applyStyle();
        egc_rowLoadingObserver.subscribe(this);
    }

    dataDidUpdate() {
        egc_inMemoryGanttChart.getState("rows").forEach(row => {
            const e = document.createElement("div");
            e.innerText = row.name;
            e.id = `row ${row.id}`;
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