import { egc_titleObserver,egc_inMemoryGanttChart, egc_updateTitleCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input id="title-controller" class="egc-title"/>
`;

export class EGC_TitleController extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.titleController = this.querySelector('#title-controller');
        egc_titleObserver.subscribe(this);
        this.titleController.onchange = () => egc_updateTitleCommand.execute(this.titleController.value);
    }

    dataDidUpdate() {
        this.titleController.value = egc_inMemoryGanttChart.getState("title");
    }
}

window.customElements.define('egc-title-controller', EGC_TitleController);