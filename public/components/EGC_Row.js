import { egc_columnWidthObserver, egc_dateObserver, egc_inMemoryGanttChart, egc_inMemoryGanttChartSettings, egc_loadColumnWidthCommand, egc_numColumnsToLoadObserver, egc_zoomObserver } from "../instance.js";

export class EGC_Row extends HTMLElement {
    constructor(rowId) {
        super();
        this.rowId = rowId;
        this.#applyStyle();
        egc_dateObserver.subscribe(this);
        egc_zoomObserver.subscribe(this);
        egc_numColumnsToLoadObserver.subscribe(this);
        egc_columnWidthObserver.subscribe(this);
    }

    dataDidUpdate() {
        const state = egc_inMemoryGanttChart.getState("rows").filter(x => x.id == this.rowId)[0];
        this.innerHTML = '';
        this.style.gridTemplateColumns = `${egc_inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(egc_inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${egc_inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        const header = document.createElement('span');
        header.style.display = "grid";
        header.style.position = "sticky";
        header.style.left = "0";
        header.innerText = state.name;
        this.appendChild(header);
        for (let i = 0; i < egc_inMemoryGanttChartSettings.getState("numColumnsToLoad"); i++) {
            const e = document.createElement('span');
            e.style.display = "grid";
            this.appendChild(e)
        }
    }

    #applyStyle() {
        this.setAttribute('part', 'egc-row');
        this.style.display = 'grid';
    }
}

window.customElements.define('egc-row', EGC_Row);