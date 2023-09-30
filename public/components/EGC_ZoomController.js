import { egc_inMemoryGanttChart, egc_updateZoomCommand, egc_zoomObserver } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <select id="zoom-controller" class="egc-zoom">
        <option value="month">Month</option>
        <option value="day">Day</option>
        <option value="shift">Shift</option>
        <option value="hour">Hour</option>
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
        this.zoomController.value = egc_inMemoryGanttChart.getState("zoom");
    }
}

window.customElements.define('egc-zoom-controller', EGC_ZoomController);