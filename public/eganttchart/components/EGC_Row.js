import {EGC_RowHeader} from "./EGC_RowHeader.js";
import {EGC_Component} from "./EGC_Component.js";
import {EGC_Event} from "./EGC_Event.js";

export class EGC_Row extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.setAttribute('part', 'row');
        this.rowId = rowId;
        this.#applyStyle();
        this.appendChild(new EGC_RowHeader(this.$, this.rowId));
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);

    }

    dataDidUpdate() {
        this.style.gridTemplateColumns = `${this.$.inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(this.$.inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${this.$.inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        let startTime = this.$.inMemoryGanttChart.getState('date');
        let endTime = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTime();
        this.$.inMemoryGanttChart.getState('events')
            .filter(event => (
                Array.from(this.children).slice(1).every(e => e.eventId !== event.id)
                && event.parentRowIds.includes(this.rowId)
                && !(event.startTime >= endTime)
                && !(event.endTime <= startTime)
            ))
            .forEach(async event => {
                this.appendChild(new EGC_Event(this.$, event.id));
            })
    }

    #applyStyle() {
        this.style.display = 'grid';
    }
}

window.customElements.define('egc-row', EGC_Row);