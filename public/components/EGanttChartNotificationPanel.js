const template = document.createElement('template');
template.innerHTML = `
    Loading...
`;

export class EGanttChartNotificationPanel extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('e-gantt-chart-notification-panel', EGanttChartNotificationPanel);