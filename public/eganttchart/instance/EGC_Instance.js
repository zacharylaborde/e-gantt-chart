import {EGC_InMemoryRepository} from "../infrastructure/repositories/EGC_InMemoryRepository.js";
import {EGC_Observer} from "../infrastructure/observers/EGC_Observer.js";
import {EGC_LoadCommand} from "../infrastructure/commands/EGC_LoadCommand.js";
import {EGC_UpdateCommand} from "../infrastructure/commands/EGC_UpdateCommand.js";
import {EGC_ZoomService} from "../infrastructure/services/EGC_ZoomService.js";

export class EGC_Instance {
    constructor(state, settings) {
        this.inMemoryGanttChart = new EGC_InMemoryRepository(state);
        this.inMemoryGanttChartSettings = new EGC_InMemoryRepository(settings);
        this.#createObservers();
        this.#createCommands();
        this.#createServices();
    }

    #createObservers() {
        this.titleObserver = new EGC_Observer();
        this.dateObserver = new EGC_Observer();
        this.zoomObserver = new EGC_Observer();
        this.numColumnsToLoadObserver = new EGC_Observer();
        this.tableBodyObserver = new EGC_Observer();
        this.columnWidthObserver = new EGC_Observer();
        this.errorObserver = new EGC_Observer();
        this.rowNameObservers = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('rows').length; i++) {
            this.rowNameObservers.push({
                id: this.inMemoryGanttChart.getState('rows')[i].id,
                observer: new EGC_Observer()
            });
        }
        this.eventNameObservers = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.eventNameObservers.push({
                id: this.inMemoryGanttChart.getState('events')[i].id,
                observer: new EGC_Observer()
            })
        }
    }

    #createCommands() {
        this.loadTitleFromMemoryCommand = new EGC_LoadCommand("title")
            .repo(this.inMemoryGanttChart)
            .observer(this.titleObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("title", value));
        this.updateTitleCommand = new EGC_UpdateCommand("title")
            .repo(this.inMemoryGanttChart)
            .observer(this.titleObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockUpdate("title", value));


        this.loadDateFromMemoryCommand = new EGC_LoadCommand("date")
            .repo(this.inMemoryGanttChart)
            .observer(this.dateObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("date", value));
        this.updateDateCommand = new EGC_UpdateCommand("date")
            .repo(this.inMemoryGanttChart)
            .observer(this.dateObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockUpdate("date", value));


        this.loadZoomFromMemoryCommand = new EGC_LoadCommand("zoom")
            .repo(this.inMemoryGanttChart)
            .observer(this.zoomObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("zoom", value))
            .after(value => this.updateColumnWidthCommand.execute(this.inMemoryGanttChartSettings.getState('zoomWidthMap')[value]))
        this.updateZoomCommand = new EGC_UpdateCommand("zoom")
            .repo(this.inMemoryGanttChart)
            .observer(this.zoomObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockUpdate("zoom", value))
            .after(value => this.updateColumnWidthCommand.execute(this.inMemoryGanttChartSettings.getState('zoomWidthMap')[value]))


        this.loadNumColumnsToLoadCommand = new EGC_LoadCommand("numColumnsToLoad")
            .repo(this.inMemoryGanttChartSettings)
            .observer(this.numColumnsToLoadObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("numColumnsToLoad", value));
        this.updateNumColumnsToLoadCommand = new EGC_UpdateCommand("numColumnsToLoad")
            .repo(this.inMemoryGanttChartSettings)
            .observer(this.numColumnsToLoadObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockUpdate("numColumnsToLoad", value));


        this.loadColumnWidthCommand = new EGC_LoadCommand("columnWidth")
            .repo(this.inMemoryGanttChartSettings)
            .observer(this.columnWidthObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("columnWidth", value))
        this.updateColumnWidthCommand = new EGC_UpdateCommand("columnWidth")
            .repo(this.inMemoryGanttChartSettings)
            .observer(this.columnWidthObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockUpdate("columnWidth", value))


        this.loadTableBodyFromMemoryCommand = new EGC_LoadCommand("rows")
            .repo(this.inMemoryGanttChart)
            .observer(this.tableBodyObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("rows", value));
        this.updateTableBodyCommand = new EGC_UpdateCommand("rows")
            .repo(this.inMemoryGanttChart)
            .observer(this.tableBodyObserver)
            .errorObserver(this.errorObserver)
            .before(value => this.#mockLoad("rows", value));

        this.loadRowNameFromMemoryCommands = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('rows').length; i++) {
            this.loadRowNameFromMemoryCommands.push({
                id: this.inMemoryGanttChart.getState('rows')[i].id,
                command: new EGC_LoadCommand("rows", i, "name")
                    .repo(this.inMemoryGanttChart)
                    .observer(this.rowNameObservers.filter(o => o.id === this.inMemoryGanttChart.getState('rows')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockLoad(`row ${this.inMemoryGanttChart.getState('rows')[i].id} name`, value))
            });
        }
        this.updateRowNameCommands = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('rows').length; i++) {
            this.updateRowNameCommands.push({
                id: this.inMemoryGanttChart.getState('rows')[i].id,
                command: new EGC_UpdateCommand("rows", i, "name")
                    .repo(this.inMemoryGanttChart)
                    .observer(this.rowNameObservers.filter(o => o.id === this.inMemoryGanttChart.getState('rows')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockUpdate(`row ${this.inMemoryGanttChart.getState('rows')[i].id} name`, value))
            });
        }

        this.loadEventNameCommands = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.loadEventNameCommands.push({
                id: this.inMemoryGanttChart.getState('events')[i].id,
                command: new EGC_LoadCommand('events', i, 'name')
                    .repo(this.inMemoryGanttChart)
                    .observer(this.eventNameObservers.filter(o => o.id === this.inMemoryGanttChart.getState('events')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockUpdate(`event ${this.inMemoryGanttChart.getState('events')[i].id} name`, value))
            })
        }
    }

    #createServices() {
        this.zoomService = {
            month: new EGC_ZoomService("Month")
                .upperTimelineStrategy((date) => {
                    const result = [];
                    let currentDate = new Date(date);
                    let remainingDays = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    while (remainingDays > 0) {
                        const currentMonth = currentDate.getMonth();
                        const currentYear = currentDate.getFullYear();
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                        const daysLeftInMonth = daysInMonth - currentDate.getDate() + 1;
                        const daysToAdd = Math.min(daysLeftInMonth, remainingDays);
                        const text = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                        result.push({
                            text: text,
                            columnCount: daysToAdd
                        });
                        remainingDays -= daysToAdd;
                        currentDate = new Date(currentYear, currentMonth + 1, 1);
                    }
                    return result;
                })
                .lowerTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setDate(startDate.getDate() + index);
                        return newDate.toLocaleDateString([], {day: '2-digit'})
                    });
                })
                .getEndTimeStrategy(_ => {
                    let startDate = this.inMemoryGanttChart.getState('date');
                    let numColumnsToLoad = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    let endDate = new Date(startDate);
                    endDate.setUTCDate(startDate.getUTCDate() + numColumnsToLoad);
                    return endDate;
                })
                .getStartIndexStrategy(startTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setDate(newDate.getDate() + 1);
                        if (newDate.getDate() === startTime.getDate())
                            return i + 2;
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setDate(newDate.getDate() + 1);
                        if (newDate.getDate() === endTime.getDate())
                            return i + 3;
                    }
                    return null;
                }),

            day: new EGC_ZoomService("Day")
                .upperTimelineStrategy((date) => {
                    const result = [];
                    let currentDate = new Date(date);
                    let remainingDays = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    while (remainingDays > 0) {
                        const currentMonth = currentDate.getMonth();
                        const currentYear = currentDate.getFullYear();
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                        const daysLeftInMonth = daysInMonth - currentDate.getDate() + 1;
                        const daysToAdd = Math.min(daysLeftInMonth, remainingDays);
                        const text = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                        result.push({
                            text: text,
                            columnCount: daysToAdd
                        });
                        remainingDays -= daysToAdd;
                        currentDate = new Date(currentYear, currentMonth + 1, 1);
                    }
                    return result;
                })
                .lowerTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setDate(startDate.getDate() + index);
                        return newDate.toLocaleDateString([], {day: '2-digit'})
                    });
                })
                .getEndTimeStrategy(_ => {
                    let startDate = this.inMemoryGanttChart.getState('date');
                    let numColumnsToLoad = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    let endDate = new Date(startDate);
                    endDate.setUTCDate(startDate.getUTCDate() + numColumnsToLoad);
                    return endDate;
                })
                .getStartIndexStrategy(startTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setDate(newDate.getDate() + 1);
                        if (newDate.getDate() === startTime.getDate())
                            return i + 2;
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setDate(newDate.getDate() + 1);
                        if (newDate.getDate() === endTime.getDate())
                            return i + 3;
                    }
                    return null;
                }),

            shift: new EGC_ZoomService("Shift")
                .upperTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad") / 3}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setDate(startDate.getDate() + index);
                        return {
                            text: newDate.toLocaleString('default', { weekday: 'long' }),
                            columnCount: 3
                        }
                    });
                })
                .lowerTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setHours(startDate.getHours() + (index * 8));
                        return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    });
                })
                .getEndTimeStrategy(_ => {
                    let startDate = this.inMemoryGanttChart.getState('date');
                    let numColumnsToLoad = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    let endDate = new Date(startDate);
                    endDate.setUTCHours(startDate.getUTCHours() + numColumnsToLoad * 8);
                    return endDate;
                })
                .getStartIndexStrategy(startTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 8);
                        if (newDate.getHours() === startTime.getHours())
                            return i + 2;
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 8);
                        if (newDate.getHours() === endTime.getHours())
                            return i + 3;
                    }
                    return null;
                }),

            hour: new EGC_ZoomService("Hour")
                .upperTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad") / 24}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setDate(startDate.getDate() + index);
                        return {
                            text: newDate.toLocaleString('default', { weekday: 'long' }),
                            columnCount: 24
                        }
                    });
                })
                .lowerTimelineStrategy((date) => {
                    const startDate = new Date(date);
                    return Array.from({length: this.inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                        const newDate = new Date(startDate);
                        newDate.setHours(startDate.getHours() + index);
                        return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    });
                })
                .getEndTimeStrategy(_ => {
                    let startDate = this.inMemoryGanttChart.getState('date');
                    let numColumnsToLoad = this.inMemoryGanttChartSettings.getState("numColumnsToLoad");
                    let endDate = new Date(startDate);
                    endDate.setUTCHours(startDate.getUTCHours() + numColumnsToLoad + 1);
                    return endDate;
                })
                .getStartIndexStrategy(startTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 1);
                        if (newDate.getHours() === startTime.getHours() && newDate.getDate() === startTime.getDate())
                            return i + 2;
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 1);
                        if (newDate.getHours() === endTime.getHours() && newDate.getDate() === endTime.getDate())
                            return i + 3;
                    }
                    return null;
                })
        }
    }

    #mockLoad(key, value) {
        console.log(`Loaded ${key}: ${value}`);
    }

    #mockUpdate(key, value) {
        console.log(`Updated ${key}: ${value}`);
    }
}