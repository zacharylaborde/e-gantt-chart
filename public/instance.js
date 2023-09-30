import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_Observer } from "./infrastructure/observers/EGC_Observer.js";
import { EGC_UpdateCommand } from "./infrastructure/commands/EGC_UpdateCommand.js";
import { EGC_LoadCommand } from "./infrastructure/commands/EGC_LoadCommand.js";

const ganttChartData = {
    title: "No Title",
    date: "2023-09-26",
    zoom: "day"
}

// repositories
export const egc_inMemoryGanttChart = new EGC_InMemoryRepository(ganttChartData);

// observers.
export const egc_titleObserver = new EGC_Observer();
export const egc_dateObserver = new EGC_Observer();
export const egc_zoomObserver = new EGC_Observer();
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
    .before(value => mockLoad("zoom", value));
export const egc_updateZoomCommand = new EGC_UpdateCommand("zoom")
    .repo(egc_inMemoryGanttChart)
    .observer(egc_zoomObserver)
    .errorObserver(egc_errorObserver)
    .before(value => mockUpdate("zoom", value));


function mockUpdate(key, value) {
    return new Promise(resolve => {
        console.log(`Updating ${key}: ${value}`);
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

function mockLoad(key, value) {
    return new Promise(resolve => {
        console.log(`Loaded ${key}: ${value}`);
        setTimeout(() => {
            resolve();
        }, 200);
    });
}