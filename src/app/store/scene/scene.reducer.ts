import { createReducer, on } from '@ngrx/store';
import { fixedPlaces } from 'src/app/advMode/adventure/adventureModules/varlenia.places';
import { fixedNpc } from 'src/app/advMode/adventure/adventureModules/varlenia.npc';
import { fixedItems } from 'src/app/advMode/adventure/adventureModules/varlenia.items';

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
let places = fixedPlaces;
let npc = fixedNpc;
let items = fixedItems;

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
    items: place.items ? items.filter((e) => place.items.includes(e.id)) : [],
    npc: place.npc ? npc.filter((e) => place.npc.includes(e.id)) : [],
    reachablePlaces: place.places
      ? places.filter((e) => place.places.includes(e.id))
      : [],
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
