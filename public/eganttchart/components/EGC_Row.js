import {EGC_RowHeader} from "./EGC_RowHeader.js";
import {EGC_EventManager} from "../managers/EGC_EventManager.js";
import {EGC_Component} from "./EGC_Component.js";

export class EGC_Row extends EGC_Component {
    constructor(rowId) {
        super();
        this.rowId = rowId;
        this.#applyStyle();
        this.appendChild(new EGC_RowHeader(this.rowId));
        this.eventManager = new EGC_EventManager(this);
    }

    connectedCallback() {
        this.eventManager.connectedCallback();
        this.getState().numColumnsToLoadObserver.subscribe(this);
        this.getState().columnWidthObserver.subscribe(this);
    }

    dataDidUpdate() {
        this.style.gridTemplateColumns = `${this.$().inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(this.$().inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${this.$().inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        if (this.children.length > parseInt(this.$().inMemoryGanttChartSettings.getState("numColumnsToLoad")))
            while (this.children.length - 1 > parseInt(this.$().inMemoryGanttChartSettings.getState("numColumnsToLoad")))
                this.removeChild(this.lastChild);
        else
            while (this.children.length <= parseInt(this.$().inMemoryGanttChartSettings.getState("numColumnsToLoad")))
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