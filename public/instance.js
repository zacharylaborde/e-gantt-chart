import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_UpdateGanttTitleCommand } from "./infrastructure/commands/EGC_UpdateGanttTitleCommand.js";
import { EGC_TitlePresenter } from "./infrastructure/presenters/EGC_TitlePresenter.js";
import { EGC_ErrorPresenter } from "./infrastructure/presenters/EGC_ErrorPresnter.js";
import { EGC_DatePresenter } from "./infrastructure/presenters/EGC_DatePresenter.js";
import { EGC_UpdateDateCommand } from "./infrastructure/commands/EGC_UpdateDateCommand.js";
import { EGC_LoadDateFromMemoryCommand } from "./infrastructure/commands/EGC_LoadDateFromMemoryCommand.js";
import { EGC_LoadGanttTitleFromMemoryCommand } from "./infrastructure/commands/EGC_LoadGanttTitleFromMemoryCommand.js";

// repositories
export const egc_repository = new EGC_InMemoryRepository()

// presenters.
export const egc_titlePresenter = new EGC_TitlePresenter();
export const egc_datePresenter = new EGC_DatePresenter();
export const egc_errorPresenter = new EGC_ErrorPresenter();

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