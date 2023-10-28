import { egc_dateObserver, egc_inMemoryGanttChart, egc_updateDateCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input type="date" id="date-controller" class="egc-date"/>
`;

export class EGC_DateController extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.dateController = this.querySelector('#date-controller');
        egc_dateObserver.subscribe(this);
        this.dateController.onchange = () => egc_updateDateCommand.execute(new Date(this.dateController.value));
    }

    dataDidUpdate() {
        this.dateController.value = egc_inMemoryGanttChart.getState("date").toISOString().split('T')[0];
    }
}

window.customElements.define('egc-date-controller', EGC_DateController);