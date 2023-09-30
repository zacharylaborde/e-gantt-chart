import { EGC_ControlPanel } from "./EGC_ControlPanel.js";
import { EGC_Table } from "./EGC_Table.js";

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(new EGC_ControlPanel());
        this.root.appendChild(new EGC_Table());
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);