import { createAction, props } from '@ngrx/store';
import { IAction, ILogEntry } from 'src/app/interfaces/events.interface';
import { IPlace } from 'src/app/interfaces/places.interface';

//Scene
export const sendAction = createAction(
  '[Scene] Send action',
  props<{ actionId: string }>()
);
export const getActiveAction = createAction(
  '[Scene] Get active action',
  props<{ actionId: string }>()
);

export const pushEquipmentActions = createAction(
  '[Scene] push equipment actions',
  props<{ actions: IAction[] }>()
);
export const pushAction = createAction(
  '[Scene] push action',
  props<{ action: IAction }>()
);
export const removeAction = createAction(
  '[Scene] push action',
  props<{ id: string }>()
);
/**
 * Manually override a scene parameter
 */
export const setScene = createAction(
  '[Scene] Set Scene',
  props<{
    place?: IPlace;
    music?: string;
    text?: string;
    title?: string;
    centerOverlay?: string;
    leftOverlay?: string;
    rightOverlay?: string;
    backgroundImg?: string;
    activeAction: string;
  }>()
);

export const loadPlace = createAction(
  '[Scene] Load place',
  props<{ place: IPlace }>()
);
export const addImgToScene = createAction(
  '[Scene] Add image to scene',
  props<{ name: string; keywords: string[]; position: -1 | 0 | 1 }>()
);
export const rempveImgToScene = createAction(
  '[Scene] Add image to scene',
  props<{ name: string; keywords: string[]; position: -1 | 0 | 1 }>()
);
export const changeSceneBackground = createAction(
  '[Scene] Change background',
  props<{ name: string; keywords: string[] }>()
);
export const setActiveEvent = createAction(
  '[Scene] Change background',
  props<{ id: string }>()
);
export const updateLog = createAction(
  '[Log] Update log',
  props<{ logEntry: ILogEntry }>()
);
export const setText = createAction(
  '[Log] set Text',
  props<{ text: string }>()
);
export const removeLog = createAction(
  '[Log] Update log',
  props<{ id: string }>()
);
export const clearLog = createAction(
  '[Log] Clear log',
  props<{ saveLog: boolean }>()
);
