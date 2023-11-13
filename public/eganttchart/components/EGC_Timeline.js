import {EGC_Component} from "./EGC_Component.js";

const template = document.createElement('template');
template.innerHTML = `
    <div id="upper-timeline"></div>
    <div id="lower-timeline"></div>
`;

export class EGC_Timeline extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'timeline');
        this.appendChild(template.content.cloneNode(true));
        this.upperTimeline = this.querySelector("#upper-timeline");
        this.lowerTimeline = this.querySelector("#lower-timeline");
        this.#applyStyle();
        this.$.dateObserver.subscribe(this);
        this.$.zoomObserver.subscribe(this);
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.$.columnWidthObserver.subscribe(this);
    }

    dataDidUpdate() {
        const date = new Date(this.$.inMemoryGanttChart.getState("date"));
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
        const zoom = this.$.inMemoryGanttChart.getState("zoom");
        this.upperTimeline.innerHTML = '';
        this.lowerTimeline.innerHTML = '';
        this.upperTimeline.style.gridTemplateColumns = `${this.$.inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(this.$.inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${this.$.inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        this.lowerTimeline.style.gridTemplateColumns = `${this.$.inMemoryGanttChartSettings.getState("leftHeaderWidth")}px repeat(${parseInt(this.$.inMemoryGanttChartSettings.getState("numColumnsToLoad"))}, ${this.$.inMemoryGanttChartSettings.getState('columnWidth')}px)`;
        const upperTimelineEmptySpace = document.createElement("span");
        upperTimelineEmptySpace.setAttribute('part', 'upper-timeline');
        this.upperTimeline.appendChild(upperTimelineEmptySpace);
        const lowerTimelineEmptySpace = document.createElement("span");
        lowerTimelineEmptySpace.setAttribute('part', 'lower-timeline');
        this.lowerTimeline.appendChild(lowerTimelineEmptySpace);
        this.$.zoomService[zoom].generateUpperTimeline(localDate).forEach(e => {
            const elem = document.createElement("span");
            const child = document.createElement("span");
            elem.setAttribute('part', 'upper-timeline-dt');
            child.innerText = e.text;
            elem.style.gridColumn = `span ${e.columnCount}`
            child.style.position = "sticky";
            child.style.left = "0";
            child.style.transform = "translateX(-50%)";
            elem.appendChild(child);
            this.upperTimeline.appendChild(elem);
        });
        this.$.zoomService[zoom].generateLowerTimeline(localDate).forEach(e => {
            const elem = document.createElement("span");
            elem.setAttribute('part', 'lower-timeline-dt');
            elem.innerText = e;
            elem.style.display = 'flex';
            elem.style.justifyContent = 'center';
            this.lowerTimeline.appendChild(elem);
        });
    }

    #applyStyle() {
        this.style.display = 'grid';
        this.style.position = 'sticky';
        this.style.top = '0';
        this.style.gridTemplateColumns = '1fr';
        this.upperTimeline.setAttribute('part', 'upper-timeline');
        this.upperTimeline.style.display = 'grid';
        this.lowerTimeline.setAttribute('part', 'lower-timeline');
        this.lowerTimeline.style.display = 'grid';
        this.style.zIndex = '1';
    }

    disconnectedCallback() {
        this.$.dateObserver.unsubscribe(this);
        this.$.zoomObserver.unsubscribe(this);
        this.$.numColumnsToLoadObserver.unsubscribe(this);
        this.$.columnWidthObserver.unsubscribe(this);
    }
}

window.customElements.define('egc-timeline', EGC_Timeline);