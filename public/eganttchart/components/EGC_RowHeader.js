import {EGC_Component} from "./EGC_Component.js";

export class EGC_RowHeader extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.#applyStyle();
        this.rowId = rowId;
        this.$.rowNameObservers.filter(o => o.id === this.rowId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        let content = document.createElement('span')
        content.innerText = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name;
        content.style.position = 'sticky';
        content.style.left = '0';
        content.style.pointerEvents = 'auto';
        content.style.height = '100%';
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.width = `${this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth')}px`;
        content.setAttribute('part', 'row-header');
        this.replaceChildren(content);
    }

    #applyStyle() {
        this.style.position = "absolute";
        this.style.display = 'flex';
        this.style.left = "0";
        this.style.alignItems = 'center';
        this.style.height = '100%';
        this.style.width = '100%';
        this.style.userSelect = 'none';
        this.style.pointerEvents = 'none';
    }
}

window.customElements.define('egc-row-header', EGC_RowHeader);