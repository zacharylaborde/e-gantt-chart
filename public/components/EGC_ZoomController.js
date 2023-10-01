import { egc_inMemoryGanttChart, egc_timeRangeGeneratorServices, egc_updateZoomCommand, egc_zoomObserver } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <select id="zoom-controller" class="egc-zoom">
    </select>
`;

export class EGC_ZoomController extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.zoomController = this.querySelector('#zoom-controller');
        egc_zoomObserver.subscribe(this);
        this.zoomController.onchange = () => egc_updateZoomCommand.execute(this.zoomController.value);
    }

    dataDidUpdate() {
        this.zoomController.innerHTML = '';
        Object.keys(egc_timeRangeGeneratorServices).forEach(key => {
            const e = document.createElement('option');
            e.innerText = egc_timeRangeGeneratorServices[key].name;
            console.log(egc_timeRangeGeneratorServices[key]);
            e.value = key;
            this.zoomController.appendChild(e);
        })
        this.zoomController.value = egc_inMemoryGanttChart.getState("zoom");
    }
}

window.customElements.define('egc-zoom-controller', EGC_ZoomController);