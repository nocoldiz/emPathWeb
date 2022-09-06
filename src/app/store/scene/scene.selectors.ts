import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SceneState } from './scene.state';

export const getScene = createFeatureSelector<AppState, SceneState>('scene');
export const sceneUpdate = createSelector(
  getScene,
  (state: SceneState) => state
);
export const getLog = createSelector(
  getScene,
  (state: SceneState) => state.log
);
export const getSceneImg = createSelector(
  getScene,
  (state: SceneState) => state.backgroundImg
);
export const getPlace = createSelector(
  getScene,
  (state: SceneState) => state.place
);

export const getActiveAction = createSelector(
  getScene,
  (state: SceneState) => state.place
);

export const getActions = createSelector(
  getScene,
  (state: SceneState) => state.actions
);
