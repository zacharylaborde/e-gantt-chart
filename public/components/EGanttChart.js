import { EGC_ControlPanel } from "./EGC_ControlPanel.js";
import { EGC_Table } from "./EGC_Table.js";
import { egc_loadRowsFromMemoryCommand, egc_loadDateFromMemoryCommand, egc_loadNumColumnsToLoadCommand, egc_loadTitleFromMemoryCommand, egc_loadZoomFromMemoryCommand } from "../instance.js";

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(new EGC_ControlPanel());
        this.root.appendChild(new EGC_Table());
    }

    connectedCallback() {
        egc_loadDateFromMemoryCommand.execute();
        egc_loadTitleFromMemoryCommand.execute();
        egc_loadZoomFromMemoryCommand.execute();
        egc_loadNumColumnsToLoadCommand.execute();
        egc_loadRowsFromMemoryCommand.execute();
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);