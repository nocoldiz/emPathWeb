import { createReducer, on } from '@ngrx/store';
import { setActiveEvent, updateLog } from './scene.actions';
import { initialState } from './scene.state';

export const sceneReducer = createReducer(
  initialState,
  // Set active event
  on(setActiveEvent, (state, { id }) => ({
    ...state,
    activeEvent: id,
  })),

  on(updateLog, (state, { action, description }) => ({
    ...state,
    log: [...state.log],
  }))
);
