import {EGC_Row} from "./EGC_Row.js";
import {EGC_Component} from "./EGC_Component.js";
import {EGC_GroupHeader} from "./EGC_GroupHeader.js";


export class EGC_Body extends EGC_Component {
    constructor($, groupId) {
        super($);
        this.setAttribute('part', 'body');
        this.#applyStyle();
        this.groupId = groupId;
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.subscribe(this);
        this.appendChild(new EGC_GroupHeader(this.$, this.groupId));
        this.$.inMemoryGanttChart.getState("rows")
            .filter(row => row.parentGroupIds.includes(this.groupId))
            .forEach(row => this.appendChild(new EGC_Row(this.$, row.id)));
    }

    dataDidUpdate() {
        const currentRows = Array.from(this.children);
        const rowsData = this.$.inMemoryGanttChart.getState("rows").filter(row => row.parentGroupIds.includes(this.groupId));
        this.#removeDeletedRows(rowsData);
        rowsData.forEach((rowData, index) => {
            const existingRow = currentRows.find(row => row.rowId === rowData.id);
            if (existingRow) {
                if (this.children[index + 1] !== existingRow)
                    this.insertBefore(existingRow, this.children[index]);
            } else {
                const newRow = new EGC_Row(this.$, rowData.id);
                if (this.children[index + 1]) this.insertBefore(newRow, this.children[index]);
                else this.appendChild(newRow);
            }
        });
        this.style.paddingTop = `${this.$.inMemoryGanttChartSettings.getState('groupHeaderHeight')}px`
    }

    #removeDeletedRows(rowsData) {
        Array.from(this.children).splice(1).forEach(row => {
            const existsInNewData = rowsData.some(data => data.id === row.rowId);
            if (!existsInNewData) this.removeChild(row);
        });
    }

    #applyStyle() {
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '1fr';
        this.style.gridAutoRows = 'minmax(30px, auto)';
    }

    disconnectedCallback() {
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-body', EGC_Body);