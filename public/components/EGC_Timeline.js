import { 
    egc_dateObserver, 
    egc_inMemoryGanttChart, 
    egc_zoomObserver, 
    egc_numColumsToLoadObserver,
    egc_timeRangeGeneratorServices,
    egc_inMemoryGanttChartSettings
} from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <div id="upper-timeline"></div>
    <div id="lower-timeline"></div>
`;

export class EGC_Timeline extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('part', 'timeline');
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '1fr';
        this.appendChild(template.content.cloneNode(true));
        this.upperTimeline = this.querySelector("#upper-timeline");
        this.lowerTimeline = this.querySelector("#lower-timeline");
        this.upperTimeline.setAttribute('part', 'upper-timeline');
        this.lowerTimeline.setAttribute('part', 'lower-timeline');
        this.upperTimeline.style.gridTemplateColumns = `repeat(${egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, 1fr)`;
        this.lowerTimeline.style.gridTemplateColumns = `repeat(${egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, 1fr)`;
        this.upperTimeline.style.display = 'grid';
        this.lowerTimeline.style.display = 'grid';
        egc_dateObserver.subscribe(this);
        egc_zoomObserver.subscribe(this);
        egc_numColumsToLoadObserver.subscribe(this);
    }

    dataDidUpdate() {
        const date = egc_inMemoryGanttChart.getState("date");
        const zoom = egc_inMemoryGanttChart.getState("zoom");
        this.upperTimeline.innerHTML = '';
        this.lowerTimeline.innerHTML = '';
        egc_timeRangeGeneratorServices[zoom].generateUpperTimeline(date).forEach(e => {
            const elem = document.createElement("span");
            elem.setAttribute('part', 'upper-timeline-dt');
            elem.innerText = e.text;
            console.log(e.columnCount);
            elem.style.gridColumn = `span ${e.columnCount}`
            this.upperTimeline.appendChild(elem);
        });
        egc_timeRangeGeneratorServices[zoom].generateLowerTimeline(date).forEach(e => {
            const elem = document.createElement("span");
            elem.setAttribute('part', 'lower-timeline-dt');
            elem.innerText = e;
            this.lowerTimeline.appendChild(elem);
        });
    }
}

window.customElements.define('egc-timeline', EGC_Timeline);