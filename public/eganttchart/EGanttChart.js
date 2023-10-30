import {EGC_ControlPanel} from "./components/EGC_ControlPanel.js";
import {EGC_Table} from "./components/EGC_Table.js";
import {EGC_Instance} from "./instance/EGC_Instance.js";


export class EGanttChart extends HTMLElement {
    constructor(state, settings) {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.egc = new EGC_Instance(state, settings);
        this.root.appendChild(new EGC_ControlPanel());
        this.root.appendChild(new EGC_Table());
    }

    connectedCallback() {
        this.root.egc.loadDateFromMemoryCommand.execute();
        this.root.egc.loadTitleFromMemoryCommand.execute();
        this.root.egc.loadZoomFromMemoryCommand.execute();
        this.root.egc.loadNumColumnsToLoadCommand.execute();
        this.root.egc.loadTableBodyFromMemoryCommand.execute();
        this.root.egc.loadColumnWidthCommand.execute();
        this.root.egc.loadRowNameFromMemoryCommands.forEach(x => x.command.execute());
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);