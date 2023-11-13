import {EGC_Component} from "./EGC_Component.js";
import {EGC_EditIcon} from "./EGC_EditIcon.js";

export class EGC_GroupHeader extends EGC_Component {
    constructor($, groupId) {
        super($);
        this.setAttribute('part', 'group-header');
        this.#applyStyle();
        this.groupId = groupId;
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.subscribe(this);
        this.onmouseenter = this.#onmouseenter;
        this.onmouseleave = this.#onmouseleave;
        this.onclick = this.#onclick;
        this.editIcon = new EGC_EditIcon($);
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

    #onclick() {
        this.innerHTML = `<input id="group-name-controller" />`
        const controller = this.querySelector('#group-name-controller');
        controller.value = this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name;
        controller.onfocus = _ => this.onmouseenter = null;
        controller.focus();
        controller.onkeyup = _ => {
            if (this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name === controller.value)
                controller.setAttribute("part", "group-header-input-disabled");
            else controller.setAttribute("part", "group-header-input");
        }
        controller.onblur = _ => {
            this.onmouseenter = this.#onmouseenter;
            if (this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name !== controller.value)
                this.$.updateTableBodyNameCommands.filter(group => group.id === this.groupId)[0].command.execute(controller.value)
            this.dataDidUpdate();
        }
    }

    #onmouseenter() {
        this.appendChild(this.editIcon);
    }

    #onmouseleave() {
        if (this.contains(this.editIcon))
            this.removeChild(this.editIcon);
    }

    disconnectedCallback() {
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-group-header', EGC_GroupHeader);