import {EGC_Component} from "./EGC_Component.js";

const template = document.createElement('template');
template.innerHTML = `
    <select id="zoom-controller" class="egc-zoom">
    </select>
`;

export class EGC_ZoomController extends EGC_Component {
    constructor($) {
        super($);
        this.appendChild(template.content.cloneNode(true));
        this.zoomController = this.querySelector('#zoom-controller');
        this.$.zoomObserver.subscribe(this);
        this.zoomController.onchange = () => this.$.updateZoomCommand.execute(this.zoomController.value);
    }

    dataDidUpdate() {
        this.zoomController.innerHTML = '';
        Object.keys(this.$.zoomService).forEach(key => {
            const e = document.createElement('option');
            e.innerText = this.$.zoomService[key].name;
            e.value = key;
            this.zoomController.appendChild(e);
        })
        this.zoomController.value = this.$.inMemoryGanttChart.getState("zoom");
    }
}

window.customElements.define('egc-zoom-controller', EGC_ZoomController);