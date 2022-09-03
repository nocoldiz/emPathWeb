import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState } from '../app.reducers'
export const selectLog = (state: AppState) => state.scene.log;
export const selectScene = (state: AppState) => state.scene;
export const selectGame = (state: AppState) => state.game.activeEvent;
