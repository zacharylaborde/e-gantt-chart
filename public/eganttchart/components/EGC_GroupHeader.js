import {EGC_Component} from "./EGC_Component.js";

export class EGC_GroupHeader extends EGC_Component {
    constructor($, groupId) {
        super($);
        this.setAttribute('part', 'group-header');
        this.#applyStyle();
        this.groupId = groupId;
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.subscribe(this);
    }

    dataDidUpdate() {
        this.innerText = this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name;
    }

    #applyStyle() {
        this.style.display = "block";
        this.style.position = "absolute";
        this.style.width = "100%";
        this.style.textAlign = "center";
        this.style.transform = `translateY(-${this.$.inMemoryGanttChartSettings.getState('groupHeaderHeight')}px)`;
        this.style.left = "0";
        this.style.height = `${this.$.inMemoryGanttChartSettings.getState('groupHeaderHeight')}px`
    }

    disconnectedCallback() {
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-group-header', EGC_GroupHeader);