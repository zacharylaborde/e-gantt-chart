import { EGC_Timeline } from "./EGC_Timeline.js";

export class EGC_Table extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('part', 'table');
        this.appendChild(new EGC_Timeline());
        this.style.display = 'grid';
        this.style.overflowX = 'auto';
        this.style.gridTemplateColumns = '1fr';
    }
}

window.customElements.define('egc-table', EGC_Table);