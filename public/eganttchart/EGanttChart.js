import {EGC_ControlPanel} from "./components/EGC_ControlPanel.js";
import {EGC_Table} from "./components/EGC_Table.js";
import {EGC_Instance} from "./instance/EGC_Instance.js";
import {EGC_MessageBox} from "./components/EGC_MessageBox.js";


export class EGanttChart extends HTMLElement {
    constructor(state, settings) {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.#applyStyles()
        this.$ = new EGC_Instance(state, settings);
        this.root.appendChild(new EGC_ControlPanel(this.$));
        this.root.appendChild(new EGC_Table(this.$));
        this.root.appendChild(new EGC_MessageBox(this.$));
    }

    connectedCallback() {
        this.$.loadDateFromMemoryCommand.execute();
        this.$.loadTitleFromMemoryCommand.execute();
        this.$.loadZoomFromMemoryCommand.execute();
        this.$.loadNumColumnsToLoadCommand.execute();
        this.$.loadColumnWidthCommand.execute();
        this.$.loadTableBodyNameCommands.forEach(x => x.command.execute());
        this.$.loadRowNameFromMemoryCommands.forEach(x => x.command.execute());
        this.$.loadEventNameCommands.forEach(x => x.command.execute());
    }

    #applyStyles() {
        this.style.position = "relative";
        this.style.display = "flex";
        this.style.height = "100%";
        this.style.flexDirection = 'column';
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);