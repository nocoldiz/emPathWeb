import { createReducer, on } from '@ngrx/store';
import {
  setActiveEvent,
  updateLog,
  removeLog,
  loadPlace,
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

  on(updateLog, (state, { action, description }) => ({
    ...state,
    todos: [
      ...state.log,
      { date: Date.now().toString(), action: action, description: description },
    ],
  })),
  // Remove the todo from the todos array
  on(removeLog, (state, { id }) => ({
    ...state,
    todos: state.log.filter((entry) => entry.id.toString() !== id.toString()),
  }))
);
