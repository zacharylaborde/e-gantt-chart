import {
    egc_columnWidthObserver,
    egc_inMemoryGanttChartSettings,
    egc_numColumnsToLoadObserver,
} from "../instance.js";
import { EGC_RowHeader } from "./EGC_RowHeader.js";
import {EGC_EventManager} from "./EGC_EventManager.js";

export class EGC_Row extends HTMLElement {
    constructor(rowId) {
        super();
        this.rowId = rowId;
        this.#applyStyle();
        this.appendChild(new EGC_RowHeader(this.rowId));
        this.eventManager = new EGC_EventManager(this);
        egc_numColumnsToLoadObserver.subscribe(this);
        egc_columnWidthObserver.subscribe(this);
    }

    dataDidUpdate() {
        this.style.gridTemplateColumns = `${egc_inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(egc_inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${egc_inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        if (this.children.length > parseInt(egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")))
            while (this.children.length - 1 > parseInt(egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")))
                this.removeChild(this.lastChild);
        else
            while (this.children.length <= parseInt(egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")))
                this.#addGridElement();
    }

    #addGridElement() {
        const e = document.createElement('span');
        e.style.display = "grid";
        this.appendChild(e);
    }

    #applyStyle() {
        this.setAttribute('part', 'egc-row');
        this.style.display = 'grid';
    }
}

window.customElements.define('egc-row', EGC_Row);