import { EGC_ControlPanel } from "./EGC_ControlPanel.js";
import { EGC_Table } from "./EGC_Table.js";
import {
    egc_loadTableBodyFromMemoryCommand,
    egc_loadColumnWidthCommand,
    egc_loadDateFromMemoryCommand,
    egc_loadNumColumnsToLoadCommand,
    egc_loadTitleFromMemoryCommand,
    egc_loadZoomFromMemoryCommand,
    egc_loadRowNameFromMemoryCommands
} from "../instance.js";

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
        egc_loadTableBodyFromMemoryCommand.execute();
        egc_loadColumnWidthCommand.execute();
        egc_loadRowNameFromMemoryCommands.forEach(x => x.command.execute());
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);