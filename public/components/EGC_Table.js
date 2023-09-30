import { EGC_Timeline } from "./EGC_Timeline";

export class EGC_Table extends HTMLElement {
    constructor() {
        super();
        this.appendChild(new EGC_Timeline());
    }
}

window.customElements.define('egc-table', EGC_Table);