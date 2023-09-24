const template = document.createElement('template');
template.innerHTML = `
    <div class="e-gantt-chart-controller"></div>
    <div class="e-gantt-chart-table"></div>
    <div class="e-gantt-chart-editor-panel"></div>
    <div class="e-gantt-chart-notification-panel"></div>
`;

export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);