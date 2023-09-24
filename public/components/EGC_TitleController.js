import { egc_titlePresenter, egc_updateGanttTitleCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input id="title-controller" class="egc-title"></input>
`;

export class EGC_TitleController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
        egc_titlePresenter.subscribe(this);
        this.titleController = this.root.querySelector('#title-controller');
        this.titleController.onchange = () => egc_updateGanttTitleCommand.execute(this.titleController.value);
    }

    titleDidUpdate(newTitle) {
        this.titleController.value = newTitle;
    }
}

window.customElements.define('egc-title-controller', EGC_TitleController);