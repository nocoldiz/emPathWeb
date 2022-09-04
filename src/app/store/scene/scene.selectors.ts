import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SceneState } from './scene.state';

export const getScene = createFeatureSelector<AppState, SceneState>('scene');
export const getLog = createSelector(
  getScene,
  (state: SceneState) => state.log
);

export const getPlace = createSelector(
  getScene,
  (state: SceneState) => state.place
);
export const getActiveAction = createSelector(
  getScene,
  (state: SceneState) => state.place
);
