import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SceneState } from './scene.state';

export const getScene = createFeatureSelector<AppState, SceneState>('scene');
export const getLog = createSelector(
  getScene,
  (state: SceneState) => state.log
);

/*
export const getLog = createSelector(getSceneState, (state) => {
  return state.log;
});
export const getScene = createSelector(getSceneState, (state) => {
  return state;
});
*/

/*
export const getLog = (state: SceneState) => state.log;

export const getScene = (state: SceneState) => state;
*/
