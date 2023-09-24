import { EGanttChartController } from "./EGanttChartController.js";
import { EGanttChartEditorPanel } from "./EGanttChartEditorPanel.js";
import { EGanttChartNotificationPanel } from "./EGanttChartNotificationPanel.js";
import { EGanttChartTable } from "./EGanttChartTable.js";

const template = document.createElement('template');
template.innerHTML = `
    <e-gantt-chart-controller></e-gantt-chart-controller>
    <e-gantt-chart-table></e-gantt-chart-table>
    <e-gantt-chart-editor-panel></e-gantt-chart-editor-panel>
    <e-gantt-chart-notification-panel></e-gantt-chart-notification-panel>
`;

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);