import {EGC_Component} from "./EGC_Component.js";
import {EGC_EditIcon} from "./EGC_EditIcon.js";

export class EGC_RowHeader extends EGC_Component {
    constructor($, rowId) {
        super($);
        this.#applyStyle();
        this.rowId = rowId;
        this.$.rowNameObservers.filter(o => o.id === this.rowId)[0].observer.subscribe(this);
        this.rowState = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0]
        this.onmouseenter = this.rowState.disabled ? null : this.#onmouseenter;
        this.onmouseleave = this.rowState.disabled ? null : this.#onmouseleave;
        this.onclick = this.rowState.disabled ? null : this.#onclick;
        this.editIcon = new EGC_EditIcon($);
        this.content = document.createElement('span');
    }

    dataDidUpdate() {
        this.rowState = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0]
        this.onmouseenter = this.rowState.disabled ? null : this.#onmouseenter;
        this.onmouseleave = this.rowState.disabled ? null : this.#onmouseleave;
        this.onclick = this.rowState.disabled ? null : this.#onclick;
        this.content.innerText = this.rowState.name;
        this.content.style.position = 'sticky';
        this.content.style.left = '0';
        this.content.style.pointerEvents = 'auto';
        this.content.style.height = '100%';
        this.content.style.display = 'flex';
        this.content.style.alignItems = 'center';
        this.content.style.width = `${this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth')}px`;
        this.content.setAttribute('part', this.rowState.disabled ? 'row-header-disabled' : 'row-header');
        this.replaceChildren(this.content);
    }

    #applyStyle() {
        this.style.position = "absolute";
        this.style.display = 'flex';
        this.style.left = "0";
        this.style.alignItems = 'center';
        this.style.height = '100%';
        this.style.width = '100%';
        this.style.userSelect = 'none';
        this.style.pointerEvents = 'none';
        this.style.zIndex = '1';
    }

    #onclick() {
        this.content.innerHTML = `<input id="row-name-controller" />`
        const controller = this.querySelector('#row-name-controller');
        controller.setAttribute("part", "row-name-controller-disabled");
        controller.value = this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name;
        controller.style.width = `${this.$.inMemoryGanttChartSettings.getState('leftHeaderWidth')}px`;
        controller.onfocus = _ => this.onmouseenter = null;
        controller.focus();
        controller.onkeyup = _ => {
            if (this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name === controller.value)
                controller.setAttribute("part", "row-name-controller-disabled");
            else controller.setAttribute("part", "row-name-controller");
        }
        controller.onblur = _ => {
            this.onmouseenter = this.#onmouseenter;
            if (this.$.inMemoryGanttChart.getState("rows").filter(row => row.id === this.rowId)[0].name !== controller.value)
                this.$.updateRowNameCommands.filter(row => row.id === this.rowId)[0].command.execute(controller.value)
            this.dataDidUpdate();
        }
    }

    #onmouseenter() {
        this.content.appendChild(this.editIcon);
        this.editIcon.style.right = `0`;
    }

    #onmouseleave() {
        if (this.content.contains(this.editIcon))
            this.content.removeChild(this.editIcon);
    }

    disconnectedCallback() {
        this.$.rowNameObservers.filter(o => o.id === this.rowId)[0].observer.unsubscribe(this);
    }
}

window.customElements.define('egc-row-header', EGC_RowHeader);