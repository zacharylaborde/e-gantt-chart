import { EGC_InMemoryGanttChartRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_Presenter } from "./infrastructure/presenters/EGC_Presenter.js";
import { EGC_UpdateCommand } from "./infrastructure/commands/EGC_UpdateCommand.js";
import { EGC_LoadFromMemoryCommand } from "./infrastructure/commands/EGC_LoadFromMemoryCommand.js";

// repositories
export const egc_inMemoryGanttChartRepository = new EGC_InMemoryGanttChartRepository();

// presenters.
export const egc_titlePresenter = new EGC_Presenter();
export const egc_datePresenter = new EGC_Presenter();
export const egc_zoomPresenter = new EGC_Presenter();
export const egc_errorPresenter = new EGC_Presenter();

// commands.
export const egc_loadTitleFromMemoryCommand = new EGC_LoadFromMemoryCommand("title")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async title => {console.log(`Loaded Title: ${title}`)});
export const egc_updateTitleCommand = new EGC_UpdateCommand("title")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async newTitle => {console.log(`New Title: ${newTitle}`)});


export const egc_loadDateFromMemoryCommand = new EGC_LoadFromMemoryCommand("date")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async date => {console.log(`Loaded Date: ${date}`)});
export const egc_updateDateCommand = new EGC_UpdateCommand("date")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async newDate => {console.log(`New Date: ${newDate}`)});


export const egc_loadZoomFromMemoryCommand = new EGC_LoadFromMemoryCommand("zoom")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async zoom => {console.log(`Loaded Zoom: ${zoom}`)});
export const egc_updateZoomCommand = new EGC_UpdateCommand("zoom")
    .repo(egc_inMemoryGanttChartRepository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
    .before(async newZoom => {console.log(`New Zoom: ${newZoom}`)});