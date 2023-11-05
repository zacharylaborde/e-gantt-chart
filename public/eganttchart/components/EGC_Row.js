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
        this.rowHeader = new EGC_RowHeader(this.$, this.rowId)
        this.appendChild(this.rowHeader);
        this.dropZoneIndicator = new EGC_DropZoneIndicator();
        this.appendChild(this.dropZoneIndicator);
        this.$.inMemoryGanttChart.getState('events')
            .filter(event => (
                Array.from(this.children).slice(1).every(e => e.eventId !== event.id)
                && event.parentRowIds.includes(this.rowId)
            ))
            .forEach(async event => {
                this.appendChild(new EGC_Event(this.$, event.id));
            })
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
        this.$.dateObserver.subscribe(this);
        this.ondragover = this.#ondragover;
        this.ondragleave = this.#ondragleave;
        this.ondrop = this.#ondrop;
    }

    dataDidUpdate() {
        this.style.gridTemplateColumns = `${this.$.inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(this.$.inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${this.$.inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        if (this.#numberOfVisibleElements() === 1 && this.$.inMemoryGanttChartSettings.getState('filterRowsWithNoVisibleEvents')) this.style.display = 'none';
        else this.style.display = 'grid';
    }

    #numberOfVisibleElements() {
        let count = 0;
        for (let element of this.children) {
            const style = window.getComputedStyle(element);
            if (style.display !== 'none') count++;
        }
        console.log(count);
        return count;
    }

    #ondrop(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.display = 'none';
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const id = data.id;
        const gridRect = this.getBoundingClientRect();
        const relativeX = e.clientX - gridRect.left + this.scrollLeft - (this.$.dragStartPosition - this.$.inMemoryGanttChartSettings.getState('columnWidth')/2);
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
        this.rowHeader.style.height = this.getBoundingClientRect().height;
    }

    #ondragleave(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.display = 'none';
    }

    #ondragover(e) {
        e.preventDefault();
        this.dropZoneIndicator.style.width = `${this.$.draggableWidth}px`;
        const gridRect = this.getBoundingClientRect();
        const relativeX = e.clientX - gridRect.left + this.scrollLeft - (this.$.dragStartPosition - this.$.inMemoryGanttChartSettings.getState('columnWidth')/2);
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

    #applyStyle() {
        this.style.display = 'grid';
        this.style.position = 'relative';
        this.style.gridAutoRows = 'minmax(30px, auto)';
        this.style.gridAutoFlow = 'dense';
    }
}

window.customElements.define('egc-row', EGC_Row);