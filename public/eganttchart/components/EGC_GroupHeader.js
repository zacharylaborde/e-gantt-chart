import {EGC_Component} from "./EGC_Component.js";
import {EGC_EditIcon} from "./EGC_EditIcon.js";

export class EGC_GroupHeader extends EGC_Component {
    constructor($, groupId) {
        super($);
        this.groupId = groupId;
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.subscribe(this);
        this.$.timelineHeightObserver.subscribe(this);
        this.groupState = this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0];
        this.content = document.createElement('span');
        this.content.setAttribute('part', this.groupState.disabled ? 'group-header-disabled' : 'group-header');
        this.content.onmouseenter = this.groupState.disabled ? null : _ => this.#onmouseenter();
        this.content.onmouseleave = this.groupState.disabled ? null : _ => this.#onmouseleave();
        this.content.onclick = this.groupState.disabled ? null : _ => this.#onclick();
        this.editIcon = new EGC_EditIcon($);
        this.appendChild(this.content);
        this.#applyStyle();
    }

    dataDidUpdate() {
        this.groupState = this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0];
        this.content.innerText = this.groupState.name;
        this.style.top = `${this.$.inMemoryGanttChartSettings.getState('timelineHeight')}px`;
    }

    #applyStyle() {
        this.style.position = "sticky";
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.zIndex = "1";
        this.style.background = "black";
        this.content.style.position = "sticky";
        this.content.style.left = "50%";
        this.content.style.display = "flex";
        this.content.style.alignItems = "center";
        this.content.style.transform = "translateX(-50%)";
    }

    #onclick() {
        this.content.innerHTML = `<input id="group-name-controller" />`
        const controller = this.querySelector('#group-name-controller');
        controller.setAttribute("part", "group-name-controller-disabled");
        controller.value = this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name;
        controller.onfocus = _ => {
            this.content.onmouseenter = null;
        }
        controller.focus();
        controller.onkeyup = _ => {
            if (this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name === controller.value)
                controller.setAttribute("part", "group-name-controller-disabled");
            else controller.setAttribute("part", "group-name-controller");
        }
        controller.onblur = _ => {
            this.content.onmouseenter = _ => this.#onmouseenter();
            if (this.$.inMemoryGanttChart.getState("groups").filter(group => group.id === this.groupId)[0].name !== controller.value)
                this.$.updateTableBodyNameCommands.filter(group => group.id === this.groupId)[0].command.execute(controller.value)
            this.dataDidUpdate();
        }
    }

    #onmouseenter() {
        this.content.appendChild(this.editIcon);
    }

    #onmouseleave() {
        if (this.content.contains(this.editIcon))
            this.content.removeChild(this.editIcon);
    }

    disconnectedCallback() {
        this.$.tableBodyObservers.filter(o => o.id === this.groupId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-group-header', EGC_GroupHeader);