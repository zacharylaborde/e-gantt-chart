import { EGC_InMemoryRepository } from "./infrastructure/repositories/EGC_InMemoryRepository.js";
import { EGC_UpdateGanttTitleCommand } from "./infrastructure/commands/EGC_UpdateGanttTitleCommand.js";
import { EGC_TitlePresenter } from "./infrastructure/presenters/EGC_TitlePresenter.js";
import { EGC_ErrorPresenter } from "./infrastructure/presenters/EGC_ErrorPresnter.js";

// repositories
export const egc_repository = new EGC_InMemoryRepository()

// presenters.
export const egc_titlePresenter = new EGC_TitlePresenter();
export const egc_errorPresenter = new EGC_ErrorPresenter();

// controllers.
export const egc_updateGanttTitleCommand = new EGC_UpdateGanttTitleCommand()
    .repo(egc_repository)
    .presenter(egc_titlePresenter)
    .errorPresenter(egc_errorPresenter)
    .callback(newTitle => {console.log(`New Title: ${newTitle}`)});
