import { egc_updateZoomCommand, egc_loadZoomFromMemoryCommand, egc_zoomPresenter } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <select id="zoom-controller" class="egc-zoom">
        <option value="month">Month</option>
        <option value="day">Day</option>
        <option value="shift">Shift</option>
        <option value="hour">Hour</option>
    </select>
`;

export class EGC_ZoomController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
        this.zoomController = this.root.querySelector('#zoom-controller');
        egc_zoomPresenter.subscribe(this);
        this.zoomController.onchange = () => egc_updateZoomCommand.execute(this.zoomController.value);
        egc_loadZoomFromMemoryCommand.execute();
    }

    zoomDidUpdate(newZoom) {
        this.zoomController.value = newZoom;
    }
}

window.customElements.define('egc-zoom-controller', EGC_ZoomController);