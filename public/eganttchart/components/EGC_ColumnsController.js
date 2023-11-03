import {EGC_Component} from "./EGC_Component.js";

const template = document.createElement('template');
template.innerHTML = `
    <input min="1" max="1000" type="number" id="columns-controller"/>
`;

export class EGC_ColumnsController extends EGC_Component {
    constructor($) {
        super($);
        this.setAttribute('part', 'column-controller');
        this.appendChild(template.content.cloneNode(true));
        this.columnsController = this.querySelector('#columns-controller');
        this.$.numColumnsToLoadObserver.subscribe(this);
        this.columnsController.onchange = () => {
            if (this.columnsController.value < 1) this.columnsController.value = 2;
            if (this.columnsController.value > 1000) this.columnsController.value = 1000;
            this.$.updateNumColumnsToLoadCommand.execute(parseInt(this.columnsController.value));
        }
    }

    dataDidUpdate() {
        this.columnsController.value = this.$.inMemoryGanttChartSettings.getState('numColumnsToLoad');
    }
}

window.customElements.define('egc-columns-controller', EGC_ColumnsController);