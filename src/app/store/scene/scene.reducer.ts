import { createReducer, on } from '@ngrx/store';
import {
  setActiveEvent,
  updateLog,
  removeLog,
  loadPlace,
  sendAction,
  setScene,
  pushAction,
  setText,
  loadPreviousPlace,
} from './scene.actions';
import { initialState } from './scene.state';

export const sceneReducer = createReducer(
  initialState,
  on(
    setScene,
    (
      state,
      {
        place,
        music,
        centerOverlay,
        leftOverlay,
        rightOverlay,
        backgroundImg,
        text,
        title,
        activeAction,
      }
    ) => ({
      ...state,
      place: place,
      music: music,
      text: text,
      centerOverlay: centerOverlay,
      leftOverlay: leftOverlay,
      rightOverlay: rightOverlay,
      backgroundImg: backgroundImg,
      title: title,
    })
  ),
  on(loadPlace, (state, { place }) => ({
    ...state,
    previousPlace: state.place,
    place: place,
  })),
  on(loadPreviousPlace, (state, { place }) => ({
    ...state,
    previousPlace: place,
  })),
  on(setText, (state, { text }) => ({
    ...state,
    text: text,
  })),

  on(pushAction, (state, { action }) => ({
    ...state,
    actions: [...state.actions, { action }],
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
  on(updateLog, (state, { logEntry }) => ({
    ...state,
    log: state.log.concat([
      Object.assign({}, logEntry, { id: state.log.length + 1 }),
    ]),
  }))
  // Remove the todo from the todos array

  /*
  on(removeLog, (state, { id }) => ({
    ...state,
    log: state.log.filter((entry) => entry.id !== id),
  }))*/
);
