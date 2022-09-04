import { createAction, props } from '@ngrx/store';
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
  props<{ description: string; action: string }>()
);

export const removeLog = createAction(
  '[Log] Update log',
  props<{ id: string }>()
);
export const clearLog = createAction(
  '[Log] Clear log',
  props<{ saveLog: boolean }>()
);
