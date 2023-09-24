import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_UpdateGanttTitleCommand } from "./infrastructure/commands/EGC_UpdateGanttTitleCommand.js";
import { EGC_TitlePresenter, EGC_ErrorPresenter, EGC_DatePresenter, EGC_ZoomPresenter } from "./infrastructure/presenters/EGC_Presenters.js";
import { EGC_UpdateDateCommand } from "./infrastructure/commands/EGC_UpdateDateCommand.js";
import { EGC_LoadDateFromMemoryCommand } from "./infrastructure/commands/EGC_LoadDateFromMemoryCommand.js";
import { EGC_LoadGanttTitleFromMemoryCommand } from "./infrastructure/commands/EGC_LoadGanttTitleFromMemoryCommand.js";
import { EGC_UpdateZoomCommand } from "./infrastructure/commands/EGC_UpdateZoomCommand.js";
import { EGC_LoadZoomFromMemoryCommand } from "./infrastructure/commands/EGC_LoadZoomFromMemoryCommand.js";

// repositories
export const egc_repository = new EGC_InMemoryRepository()

// presenters.
export const egc_titlePresenter = new EGC_TitlePresenter();
export const egc_datePresenter = new EGC_DatePresenter();
export const egc_errorPresenter = new EGC_ErrorPresenter();
export const egc_zoomPresenter = new EGC_ZoomPresenter();

// controllers.
export const egc_loadGanttTitleFromMemoryCommand = new EGC_LoadGanttTitleFromMemoryCommand()
    .repo(egc_repository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async title => {console.log(`Loaded Title: ${title}`)});
export const egc_updateGanttTitleCommand = new EGC_UpdateGanttTitleCommand()
    .repo(egc_repository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async newTitle => {console.log(`New Title: ${newTitle}`)});


export const egc_loadDateFromMemoryCommand = new EGC_LoadDateFromMemoryCommand()
    .repo(egc_repository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async date => {console.log(`Loaded Date: ${date}`)});
export const egc_updateDateCommand = new EGC_UpdateDateCommand()
    .repo(egc_repository)
    .presenter(egc_datePresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async newDate => {console.log(`New Date: ${newDate}`)});


export const egc_loadZoomFromMemoryCommand = new EGC_LoadZoomFromMemoryCommand()
    .repo(egc_repository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async zoom => {console.log(`Zoom: ${zoom}`)})
export const egc_updateZoomCommand = new EGC_UpdateZoomCommand()
    .repo(egc_repository)
    .presenter(egc_zoomPresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(async newZoom => {console.log(`New Zoom: ${newZoom}`)});