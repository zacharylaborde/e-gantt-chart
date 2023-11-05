import {EGC_RowHeader} from "./EGC_RowHeader.js";
import {EGC_Component} from "./EGC_Component.js";
import {EGC_Event} from "./EGC_Event.js";
import {EGC_DropZoneIndicator} from "./EGC_DropZoneIndicator.js";

export class EGC_Row extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.setAttribute('part', 'row');
        this.rowId = rowId;
        this.#applyStyle();
        this.appendChild(new EGC_RowHeader(this.$, this.rowId));
        this.dropZoneIndicator = new EGC_DropZoneIndicator();
        this.appendChild(this.dropZoneIndicator);
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
        this.ondragover = this.#ondragover;
        this.ondragleave = this.#ondragleave;
        this.ondrop = this.#ondrop;
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
        this.style.position = 'relative';
        this.style.gridAutoRows = 'minmax(30px, auto)';
        this.style.gridAutoFlow = 'row dense';
    }

    #ondrop(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.display = 'none';
        const id = e.dataTransfer.getData('text/plain');
        const gridRect = this.getBoundingClientRect();
        const relativeX = e.clientX - gridRect.left + this.scrollLeft;
        let startTime = this.$.inMemoryGanttChart.getState('date');
        let endTime = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTime();
        let eventState = this.$.inMemoryGanttChart.getState('events').filter(e => e.id === parseInt(id))[0];
        let startOfEvent = eventState.startTime >= startTime ? eventState.startTime : startTime;
        let endOfEvent = eventState.endTime <= endTime ? eventState.endTime : endTime;
        let startIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getStartIndex(startOfEvent);
        let endIndex = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndIndex(endOfEvent);
        let indexDiff = endIndex - startIndex;
        if (relativeX < this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth')) return;
        const adjustedX = relativeX - this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth');
        let droppedColumn = Math.floor(adjustedX / this.$.inMemoryGanttChartSettings.getState('columnWidth')) + 1;
        if (droppedColumn > this.$.inMemoryGanttChartSettings.getState('numColumnsToLoad')) return;
        let newStartDate = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getStartTimeFromIndex(droppedColumn);
        let newEndDate = this.$.zoomService[this.$.inMemoryGanttChart.getState('zoom')].getEndTimeFromIndex(droppedColumn + indexDiff)
        this.$.updateEventStartTimeCommands.filter(c => c.id === parseInt(id))[0].command.execute(newStartDate);
        this.$.updateEventEndTimeCommands.filter(c => c.id === parseInt(id))[0].command.execute(new Date(newEndDate));
    }

    #ondragleave(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.display = 'none';
    }

    #ondragover(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.width = `${this.$.inMemoryGanttChartSettings.getState('columnWidth')}px`;
        const gridRect = this.getBoundingClientRect();
        const relativeX = e.clientX - gridRect.left + this.scrollLeft;
        if (relativeX > this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth')) {
            const adjustedX = relativeX - this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth');
            let hoveredColumn = Math.floor(adjustedX / this.$.inMemoryGanttChartSettings.getState('columnWidth')) + 1;
            if (hoveredColumn <= this.$.inMemoryGanttChartSettings.getState('numColumnsToLoad')) {
                this.dropZoneIndicator.style.display = 'block';
                this.dropZoneIndicator.style.gridColumnStart = `${hoveredColumn + 1}`;
            } else this.dropZoneIndicator.style.display = 'none';
        }
        else this.dropZoneIndicator.style.display = 'none';
    }
}

window.customElements.define('egc-row', EGC_Row);