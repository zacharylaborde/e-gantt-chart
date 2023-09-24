import { egc_updateZoomCommand, egc_loadZoomFrommemoryCommand, egc_zoomPresenter } from "../instance.js";

const template = document.createElement('template');
template.innerHTML = `
    <select id="zoom-controller" class="egc-zoom"></select>
`;

export class EGC_ZoomController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
        egc_zoomPresenter.subscribe(this);
        this.zoomController = this.root.querySelector('#title-controller');
        this.zoomController.onchange = () => egc_updateZoomCommand.execute(this.zoomController.value);
        egc_loadZoomFrommemoryCommand.execute();
    }

    zoomDidUpdate(newZoom) {
        this.titleController.value = newZoom;
    }
}

window.customElements.define('egc-zoom-controller', EGC_ZoomController);