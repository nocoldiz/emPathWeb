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
export const getReachablePlaces = createSelector(
  getScene,
  (state: SceneState) => state.reachablePlaces
);

export const getPreviousPlace = createSelector(
  getScene,
  (state: SceneState) => state.previousPlace
);
export const getActiveAction = createSelector(
  getScene,
  (state: SceneState) => state.place
);

export const getActions = createSelector(
  getScene,
  (state: SceneState) => state.actions
);
export const getPlayer = createSelector(
  getScene,
  (state: SceneState) => state.player
);
export const getNpc = createSelector(
  getScene,
  (state: SceneState) => state.npc
);
export const getItems = createSelector(
  getScene,
  (state: SceneState) => state.items
);
