import { EGC_TitleController } from "./EGC_TitleController.js";

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(new EGC_TitleController());
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);