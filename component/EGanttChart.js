export class EGanttChart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.innerHTML = 'Hello world';
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);