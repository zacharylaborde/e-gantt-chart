import { egc_datePresenter, egc_loadDateFromMemoryCommand, egc_updateDateCommand } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <input type="date" id="date-controller" class="egc-date"></input>
`;

export class EGC_DateController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
        egc_datePresenter.subscribe(this);
        this.dateController = this.root.querySelector('#date-controller');
        this.dateController.onchange = () => egc_updateDateCommand.execute(this.dateController.value);
        egc_loadDateFromMemoryCommand.execute();
    }

    dateDidUpdate(newDate) {
        this.dateController.value = newDate;
    }
}

window.customElements.define('egc-date-controller', EGC_DateController);