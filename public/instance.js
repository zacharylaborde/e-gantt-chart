import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_Presenter } from "./infrastructure/presenters/EGC_Presenter.js";
import { EGC_UpdateCommand } from "./infrastructure/commands/EGC_UpdateCommand.js";
import { EGC_LoadCommand } from "./infrastructure/commands/EGC_LoadCommand.js";

const ganttChartData = {
    title: "No Title",
    date: "2023-09-26",
    zoom: "day"
}

// repositories
export const egc_inMemoryRepository = new EGC_InMemoryRepository(ganttChartData);

// presenters.
export const egc_titlePresenter = new EGC_Presenter();
export const egc_datePresenter = new EGC_Presenter();
export const egc_zoomPresenter = new EGC_Presenter();
export const egc_errorPresenter = new EGC_Presenter();

// commands.
export const egc_loadTitleFromMemoryCommand = new EGC_LoadCommand("title")
    .repo(egc_inMemoryRepository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(value => mockLoad("title", value));
export const egc_updateTitleCommand = new EGC_UpdateCommand("title")
    .repo(egc_inMemoryRepository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(value => mockLoad("title", value));


export const egc_loadDateFromMemoryCommand = new EGC_LoadCommand("date")
    .repo(egc_inMemoryRepository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(value => mockLoad("date", value));
export const egc_updateDateCommand = new EGC_UpdateCommand("date")
    .repo(egc_inMemoryRepository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(value => mockLoad("date", value));


export const egc_loadZoomFromMemoryCommand = new EGC_LoadCommand("zoom")
    .repo(egc_inMemoryRepository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
    .before(value => mockLoad("zoom", value));
export const egc_updateZoomCommand = new EGC_UpdateCommand("zoom")
    .repo(egc_inMemoryRepository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
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