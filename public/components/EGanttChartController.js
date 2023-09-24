const template = document.createElement('template');
template.innerHTML = `
    <e-gantt-chart-editable-title></e-gantt-chart-editable-title>
    <e-gantt-chart-date-picker></e-gantt-chart-date-picker>
`;

export class EGanttChartController extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('e-gantt-chart-controller', EGanttChartController);