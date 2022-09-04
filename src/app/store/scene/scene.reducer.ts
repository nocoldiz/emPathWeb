import { createReducer, on } from '@ngrx/store';
import {
  setActiveEvent,
  updateLog,
  removeLog,
  loadPlace,
  sendAction,
} from './scene.actions';
import { initialState } from './scene.state';

export const sceneReducer = createReducer(
  initialState,
  on(loadPlace, (state, { place }) => ({
    ...state,
    place: place,
  })),
  // Set active event
  on(setActiveEvent, (state, { id }) => ({
    ...state,
    activeEvent: id,
  })),
  on(sendAction, (state, { actionId }) => ({
    ...state,
    activeAction: actionId,
  })),
  on(updateLog, (state, { action, description }) => ({
    ...state,
    log: [
      ...state.log,
      { date: Date.now(), action: action, description: description },
    ],
  }))
  // Remove the todo from the todos array

  /*
  on(removeLog, (state, { id }) => ({
    ...state,
    log: state.log.filter((entry) => entry.id !== id),
  }))*/
);
