import { egc_loadGanttTitleFromMemoryCommand, egc_titlePresenter, egc_updateGanttTitleCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input id="title-controller" class="egc-title"></input>
`;

export class EGC_TitleController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
        this.titleController = this.root.querySelector('#title-controller');
        egc_titlePresenter.subscribe(this);
        this.titleController.onchange = () => egc_updateGanttTitleCommand.execute(this.titleController.value);
        egc_loadGanttTitleFromMemoryCommand.execute();
    }

    titleDidUpdate(newTitle) {
        this.titleController.value = newTitle;
    }
}

window.customElements.define('egc-title-controller', EGC_TitleController);