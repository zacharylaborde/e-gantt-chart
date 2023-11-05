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
        this.columnWidthObserver = new EGC_Observer();
        this.errorObserver = new EGC_Observer();
        this.tableBodyObservers = [];
        for (let i = 0; i < this.inMemoryGanttChart.getState('groups').length; i++) {
            this.tableBodyObservers.push({
                id: this.inMemoryGanttChart.getState('groups')[i].id,
                observer: new EGC_Observer()
            })
        }
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
        this.eventStartTimeObservers = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.eventStartTimeObservers.push({
                id: this.inMemoryGanttChart.getState('events')[i].id,
                observer: new EGC_Observer()
            })
        }
        this.eventEndTimeObservers = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.eventEndTimeObservers.push({
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

        this.loadTableBodyNameCommands = []
        for (let i = 0; i < this.inMemoryGanttChart.getState('groups').length; i++) {
            this.loadTableBodyNameCommands.push({
                id: this.inMemoryGanttChart.getState('groups')[i].id,
                command: new EGC_LoadCommand("groups", i, "name")
                    .repo(this.inMemoryGanttChart)
                    .observer(this.tableBodyObservers.filter(o => o.id === this.inMemoryGanttChart.getState('groups')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockLoad(`group ${this.inMemoryGanttChart.getState('rows')[i].id} name`, value))
            });
        }

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

        this.updateEventStartTimeCommands = [];
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.updateEventStartTimeCommands.push({
                id: this.inMemoryGanttChart.getState('events')[i].id,
                command: new EGC_UpdateCommand('events', i, 'startTime')
                    .repo(this.inMemoryGanttChart)
                    .observer(this.eventStartTimeObservers.filter(o => o.id === this.inMemoryGanttChart.getState('events')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockUpdate(`event ${this.inMemoryGanttChart.getState('events')[i].id} start time`, value))
            })
        }
        this.updateEventEndTimeCommands = [];
        for (let i = 0; i < this.inMemoryGanttChart.getState('events').length; i++) {
            this.updateEventEndTimeCommands.push({
                id: this.inMemoryGanttChart.getState('events')[i].id,
                command: new EGC_UpdateCommand('events', i, 'endTime')
                    .repo(this.inMemoryGanttChart)
                    .observer(this.eventEndTimeObservers.filter(o => o.id === this.inMemoryGanttChart.getState('events')[i].id)[0].observer)
                    .errorObserver(this.errorObserver)
                    .before(value => this.#mockUpdate(`event ${this.inMemoryGanttChart.getState('events')[i].id} end time`, value))
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
                        if (newDate.toISOString().split('T')[0] === startTime.toISOString().split('T')[0])
                            return i + 2;
                        newDate.setDate(newDate.getDate() + 1);
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        if (newDate.toISOString().split('T')[0] === endTime.toISOString().split('T')[0])
                            if (endTime.toISOString().split('T')[1] === '00:00:00.000Z') return i + 2;
                            else return i + 3;
                        newDate.setDate(newDate.getDate() + 1);
                    }
                    return null;
                })
                .getStartTimeFromIndexStrategy(startIndex => {
                    let currentDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < startIndex; i++) {
                        let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                        currentDate.setDate(newDate.getDate() + i);
                    }
                    return currentDate;
                })
                .getEndTimeFromIndexStrategy(endIndex => {
                    let currentDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < endIndex; i++){
                        let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                        currentDate.setDate(newDate.getDate() + i);
                    }
                    currentDate.setUTCHours(0, 0, 0, 0);
                    return currentDate;
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
                        if (newDate.toISOString().split('T')[0] === startTime.toISOString().split('T')[0])
                            return i + 2;
                        newDate.setDate(newDate.getDate() + 1);
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        if (newDate.toISOString().split('T')[0] === endTime.toISOString().split('T')[0])
                            if (endTime.toISOString().split('T')[1] === '00:00:00.000Z') return i + 2;
                            else return i + 3;
                        newDate.setDate(newDate.getDate() + 1);
                    }
                    return null;
                })
                .getStartTimeFromIndexStrategy(startIndex => {
                    let currentDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < startIndex; i++) {
                        let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                        currentDate.setDate(newDate.getDate() + i);
                    }
                    return currentDate;
                })
                .getEndTimeFromIndexStrategy(endIndex => {
                    let currentDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < endIndex; i++){
                        let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                        currentDate.setDate(newDate.getDate() + i);
                    }
                    currentDate.setUTCHours(0, 0, 0, 0);
                    return currentDate;
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
                        if (startTime.getHours() >= newDate.getHours()
                            && startTime.getHours() < new Date(newDate).setHours(newDate.getHours() + 8)
                            && startTime.getDate() === newDate.getDate()
                            && newDate.getMonth() === startTime.getMonth()
                            && newDate.getFullYear() === startTime.getFullYear())
                            return i + 2;
                        newDate.setHours(newDate.getHours() + 8);
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 8);
                        if (endTime.getHours() > newDate.getHours()
                            && endTime.getHours() <= new Date(newDate).setHours(newDate.getHours() + 8)
                            && endTime.getDate() === newDate.getDate()
                            && newDate.getMonth() === endTime.getMonth()
                            && newDate.getFullYear() === endTime.getFullYear())
                            return i + 3;
                    }
                    return null;
                })
                .getStartTimeFromIndexStrategy(startIndex => {
                    const startDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < startIndex; i++) {
                        const newDate = new Date(startDate);
                        startDate.setHours(newDate.getHours() + 8);
                    }
                    return startDate;
                })
                .getEndTimeFromIndexStrategy(endIndex => {
                    const currentDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < endIndex; i++) {
                        const newDate = new Date(currentDate);
                        currentDate.setHours(newDate.getHours() + 8);
                    }
                    return currentDate;
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
                        if (newDate.getHours() === startTime.getHours()
                            && newDate.getDate() === startTime.getDate()
                            && newDate.getMonth() === startTime.getMonth()
                            && newDate.getFullYear() === startTime.getFullYear())
                            return i + 2;
                    }
                    return null;
                })
                .getEndIndexStrategy(endTime => {
                    let newDate = new Date(this.inMemoryGanttChart.getState('date'));
                    for (let i = 0; i < this.inMemoryGanttChartSettings.getState('numColumnsToLoad'); i++) {
                        newDate.setHours(newDate.getHours() + 1);
                        if (newDate.getHours() === endTime.getHours()
                            && newDate.getDate() === endTime.getDate()
                            && newDate.getMonth() === endTime.getMonth()
                            && newDate.getFullYear() === endTime.getFullYear())
                            return i + 3;
                    }
                    return null;
                })
                .getStartTimeFromIndexStrategy(startIndex => {

                })
                .getEndTimeFromIndexStrategy(endIndex => {

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