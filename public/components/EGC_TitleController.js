import { egc_titleObserver, egc_updateTitleCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input id="title-controller" class="egc-title"></input>
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
        this.titleController.value = egc_inMemoryGanttChart.getState("zoom");
    }
}

window.customElements.define('egc-title-controller', EGC_TitleController);