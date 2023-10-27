import { egc_inMemoryGanttChartSettings, egc_numColumsToLoadObserver, egc_updateNumColumnsToLoadCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input type="number" id="columns-controller"/>
`;

export class EGC_ColumnsController extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.columnsController = this.querySelector('#columns-controller');
        this.columnsController.onchange = () => egc_updateNumColumnsToLoadCommand.execute(this.columnsController.value);
        egc_numColumsToLoadObserver.subscribe(this);
    }

    dataDidUpdate() {
        this.columnsController.value = egc_inMemoryGanttChartSettings.getState('numColumnsToLoad');
    }
}

window.customElements.define('egc-columns-controller', EGC_ColumnsController);