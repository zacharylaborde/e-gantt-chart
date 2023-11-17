import {EGC_ControlPanel} from "./components/EGC_ControlPanel.js";
import {EGC_Table} from "./components/EGC_Table.js";
import {EGC_Instance} from "./instance/EGC_Instance.js";
import {EGC_MessageBox} from "./components/EGC_MessageBox.js";


export class EGanttChart extends HTMLElement {
    /**
     * Represents a EGanttChart.
     * @constructor
     * @param {Object} state - The state of the gantt chart.
     * @param {string} state.title - The initial title of the gantt chart.
     * @param {Date} state.date - The starting date of the gantt chart. (UTC Time)
     * @param {string} state.zoom - An enum of 'hour', 'shift', 'day' or 'month' which represents the zoom level of the gantt chart.
     * @param {number} state.selectedEvent - The id of the event that is focused by the user. Usually null or undefined on initialization.
     * @param {Object[]} state.groups - A list of groups that will be displayed in the gantt chart.
     * @param {number} state.groups.id - the id of the given group.
     * @param {string} state.groups.name - the name of the given group.
     * @param {boolean} state.groups.disabled - Boolean determining if the group is editable by the user.
     * @param {Object[]} state.rows - A list of rows that will be displayed in the gantt chart.
     * @param {number} state.rows.id - The id of the given row.
     * @param {number[]} state.rows.parentGroupIds - The ids of the groups that parent this row.
     * @param {string} state.rows.name - The name of the given row.
     * @param {boolean} state.rows.disabled - Boolean determining if the row is editable by the user.
     * @param {Object[]} state.events - A list of events that will be displayed in the gantt chart.
     * @param {number} state.events.id - The id of the given event.
     * @param {number[]} state.events.parentRowIds - The ids of the rows that parent this event.
     * @param {Date} state.events.startTime - The start of the given event. (UTC Time)
     * @param {Date} state.events.endTime - The end time of the given event. (UTC Time)
     * @param {string} state.events.name - The name of the given event.
     * @param {boolean} state.events.disabled - Boolean determining if the row is editable by the user.
     *
     * @param {Object} settings - The settings for the gantt chart.
     * @param {number} settings.numColumnsToLoad - The number of columns that the gantt chart will load.
     * @param {number} settings.columnWidth - The width of each of the columns that the gantt chart loads.
     * @param {number} settings.leftHeaderWidth - The width of the left headers on each of the rows.
     * @param {boolean} settings.filterRowsWithNoVisibleEvents - A flag that determines if rows should be filtered if there is no content to display.
     * @param {Object} settings.zoomWidthMap - a map from zoom names to column widths.
     * @param {number} settings.zoomWidthMap.month - The column width at the month zoom.
     * @param {number} settings.zoomWidthMap.day - The column width at the day zoom.
     * @param {number} settings.zoomWidthMap.shift - The column width at the shift zoom.
     * @param {number} settings.zoomWidthMap.hour - The column width at the hour zoom.
     */
    constructor(state, settings) {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.#applyStyles()
        this.$ = new EGC_Instance(state, settings);
        this.root.appendChild(new EGC_ControlPanel(this.$));
        this.root.appendChild(new EGC_Table(this.$));
        this.root.appendChild(new EGC_MessageBox(this.$));
    }

    connectedCallback() {
        this.$.loadDateFromMemoryCommand.execute();
        this.$.loadTitleFromMemoryCommand.execute();
        this.$.loadZoomFromMemoryCommand.execute();
        this.$.loadNumColumnsToLoadCommand.execute();
        this.$.loadColumnWidthCommand.execute();
        this.$.loadTableBodyNameCommands.forEach(x => x.command.execute());
        this.$.loadRowNameFromMemoryCommands.forEach(x => x.command.execute());
        this.$.loadEventNameCommands.forEach(x => x.command.execute());
    }

    #applyStyles() {
        this.style.position = "relative";
        this.style.display = "flex";
        this.style.height = "100%";
        this.style.flexDirection = 'column';
    }
}

window.customElements.define('e-gantt-chart', EGanttChart);