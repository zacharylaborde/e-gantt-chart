import {EGC_Component} from "./EGC_Component.js";

const template = document.createElement('template');
template.innerHTML = `
    <input id="title-controller" class="egc-title"/>
`;

export class EGC_TitleController extends EGC_Component {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.titleController = this.querySelector('#title-controller');
    }

    connectedCallback() {
        this.$().titleObserver.subscribe(this);
        this.titleController.onchange = () => this.$().updateTitleCommand.execute(this.titleController.value);
    }

    dataDidUpdate() {
        this.titleController.value = this.$().inMemoryGanttChart.getState("title");
    }
}

window.customElements.define('egc-title-controller', EGC_TitleController);