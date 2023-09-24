const template = document.createElement('template');
template.innerHTML = `
    Loading...
`;

export class EGanttChartEditorPanel extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('e-gantt-chart-editor-panel', EGanttChartEditorPanel);