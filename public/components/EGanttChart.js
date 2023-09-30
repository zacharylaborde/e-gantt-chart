import { EGC_ControlPanel } from "./EGC_ControlPanel.js";

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(new EGC_ControlPanel());
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);