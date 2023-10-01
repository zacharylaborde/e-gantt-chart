import { 
    egc_dateObserver, 
    egc_inMemoryGanttChart, 
    egc_zoomObserver, 
    egc_numColumsToLoadObserver,
    egc_timeRangeGeneratorServices
} from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <div id="upper-timeline"></div>
    <div id="lower-timeline"></div>
`;

export class EGC_Timeline extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.upperTimeline = this.querySelector("#upper-timeline");
        this.lowerTimeline = this.querySelector("#lower-timeline");
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
            elem.innerText = e.text;
            // elem.columnSpan = e.columnCount;     // *** FIX THIS ***    How to change the style so that the column span is wider? Learn grids in css.
            this.upperTimeline.appendChild(elem);
        });
        egc_timeRangeGeneratorServices[zoom].generateLowerTimeline(date).forEach(e => {
            const elem = document.createElement("span");
            elem.innerText = e;
            this.lowerTimeline.appendChild(elem);
        });
    }
}

window.customElements.define('egc-timeline', EGC_Timeline);