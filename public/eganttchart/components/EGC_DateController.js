import {EGC_Component} from "./EGC_Component.js";

const template = document.createElement('template');
template.innerHTML = `
    <input type="date" id="date-controller" class="egc-date"/>
`;

export class EGC_DateController extends EGC_Component {
    constructor($) {
        super($);
        this.appendChild(template.content.cloneNode(true));
        this.dateController = this.querySelector('#date-controller');
        this.dateController.setAttribute('part', 'date-controller');
        this.$.dateObserver.subscribe(this);
        this.dateController.onchange = () => this.$.updateDateCommand.execute(new Date(this.dateController.value));
    }

    dataDidUpdate() {
        this.dateController.value = this.$.inMemoryGanttChart.getState("date").toISOString().split('T')[0];
    }

    disconnectedCallback() {
        this.$.dateObserver.unsubscribe(this);
    }
}

window.customElements.define('egc-date-controller', EGC_DateController);