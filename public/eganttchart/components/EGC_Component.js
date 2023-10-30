export class EGC_Component extends HTMLElement {
    constructor() {
        super();
    }

    getState() {
        return this.getRootNode().egc;
    }

    $() {
        return this.getState();
    }
}