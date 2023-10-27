import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_Observer } from "./infrastructure/observers/EGC_Observer.js";
import { EGC_UpdateCommand } from "./infrastructure/commands/EGC_UpdateCommand.js";
import { EGC_LoadCommand } from "./infrastructure/commands/EGC_LoadCommand.js";
import { EGC_TimeRangeGeneratorService } from "./infrastructure/services/EGC_TimeRangeGeneratorService.js";

// initial data.
const ganttChartData = {
    title: "No Title",
    date: "2023-09-26",
    zoom: "month",
    rows: [
        {
            id: 1,
            name: "Row One (The best row)"
        },
        {
            id: 2,
            name: "Row Two (The second best row)"
        }
    ]
}

const ganttChartSettingsData = {
    numColumnsToLoad: 92,
    columnWidth: 75,
    leftHeaderWidth: 75,
    zoomWidthMap: {
        month: 20,
        day: 50,
        shift: 75,
        hour: 50,
    }
}

// repositories.
export const egc_inMemoryGanttChart = new EGC_InMemoryRepository(ganttChartData);
export const egc_inMemoryGanttChartSettings = new EGC_InMemoryRepository(ganttChartSettingsData);

// observers.
export const egc_titleObserver = new EGC_Observer();
export const egc_dateObserver = new EGC_Observer();
export const egc_zoomObserver = new EGC_Observer();
export const egc_numColumnsToLoadObserver = new EGC_Observer();
export const egc_tableBodyObserver = new EGC_Observer();
export const egc_columnWidthObserver = new EGC_Observer();
export const egc_errorObserver = new EGC_Observer();

// commands.
export const egc_loadTitleFromMemoryCommand = new EGC_LoadCommand("title")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_titleObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("title", value));
export const egc_updateTitleCommand = new EGC_UpdateCommand("title")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_titleObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("title", value));


export const egc_loadDateFromMemoryCommand = new EGC_LoadCommand("date")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_dateObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("date", value));
export const egc_updateDateCommand = new EGC_UpdateCommand("date")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_dateObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("date", value));


export const egc_loadZoomFromMemoryCommand = new EGC_LoadCommand("zoom")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_zoomObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("zoom", value))
    .after(value => egc_updateColumnWidthCommand.execute(ganttChartSettingsData.zoomWidthMap[value]))
export const egc_updateZoomCommand = new EGC_UpdateCommand("zoom")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_zoomObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("zoom", value))
    .after(value => egc_updateColumnWidthCommand.execute(ganttChartSettingsData.zoomWidthMap[value]))


export const egc_loadNumColumnsToLoadCommand = new EGC_LoadCommand("numColumnsToLoad")
    .repo(egc_inMemoryGanttChartSettings)
    .observer(egc_numColumnsToLoadObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("numColumnsToLoad", value));
export const egc_updateNumColumnsToLoadCommand = new EGC_UpdateCommand("numColumnsToLoad")
    .repo(egc_inMemoryGanttChartSettings)
    .observer(egc_numColumnsToLoadObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("numColumnsToLoad", value));


export const egc_loadColumnWidthCommand = new EGC_LoadCommand("columnWidth")
    .repo(egc_inMemoryGanttChartSettings)
    .observer(egc_columnWidthObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("columnWidth", value))
export const egc_updateColumnWidthCommand = new EGC_UpdateCommand("columnWidth")
    .repo(egc_inMemoryGanttChartSettings)
    .observer(egc_columnWidthObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("columnWidth", value))


export const egc_loadAllRowsFromMemoryCommand = new EGC_LoadCommand("rows")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_tableBodyObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockLoad("rows", value));
export const egc_UpdateRowsCommand = new EGC_UpdateCommand("rows")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_tableBodyObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("rows", value));


// services.
export const egc_timeRangeGeneratorServices = {
    month: new EGC_TimeRangeGeneratorService("Month")
        .upperTimelineStrategy((date) => {
            const result = [];
            let currentDate = new Date(date);
            let remainingDays = egc_inMemoryGanttChartSettings.getState("numColumnsToLoad");
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
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                const newDate = new Date(startDate);
                newDate.setDate(startDate.getDate() + index);
                return newDate.toLocaleDateString([], {day: '2-digit'})
            });
        }),

    day: new EGC_TimeRangeGeneratorService("Day")
        .upperTimelineStrategy((date) => {
            const result = [];
            let currentDate = new Date(date);
            let remainingDays = egc_inMemoryGanttChartSettings.getState("numColumnsToLoad");
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
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                const newDate = new Date(startDate);
                newDate.setDate(startDate.getDate() + index);
                return newDate.toLocaleDateString([], {day: '2-digit'})
            });
        }),

    shift: new EGC_TimeRangeGeneratorService("Shift")
        .upperTimelineStrategy((date) => {
            const startDate = new Date(date);
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad") / 3}, (_, index) => {
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
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                const newDate = new Date(startDate);
                newDate.setHours(startDate.getHours() + (index * 8));
                return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            });
        }),
        
    hour: new EGC_TimeRangeGeneratorService("Hour")
        .upperTimelineStrategy((date) => {
            const startDate = new Date(date);
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad") / 24}, (_, index) => {
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
            return Array.from({length: egc_inMemoryGanttChartSettings.getState("numColumnsToLoad")}, (_, index) => {
                const newDate = new Date(startDate);
                newDate.setHours(startDate.getHours() + index);
                return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            });
        })
}

// ** DELETE** //
function mockUpdate(key, value) {
    return new Promise(resolve => {
        console.log(`Updating ${key}: ${value}`);
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

// ** DELETE** //
function mockLoad(key, value) {
    return new Promise(resolve => {
        console.log(`Loaded ${key}: ${value}`);
        setTimeout(() => {
            resolve();
        }, 200);
    });
}