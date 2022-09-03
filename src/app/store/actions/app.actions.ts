import { createAction, props } from '@ngrx/store';

export const loadApps = createAction('[App] Load Apps');

export const loadAppsSuccess = createAction(
  '[App] Load Apps Success',
  props<{ data: any }>()
);

export const loadAppsFailure = createAction(
  '[App] Load Apps Failure',
  props<{ error: any }>()
);
export const unlockFeature = createAction(
  '[Game] Heal Hp',
  props<{ name: string; active: boolean }>()
);

// Player

// Camper actions
export const gatherWood = createAction(
  '[Camper] Research',
  props<{ str: number; ability: string }>()
);

export const repairSolarPanel = createAction(
  '[Camper] Repair solar panel',
  props<{ int: number; ability: string }>()
);

// World
export const enterPOI = createAction(
  '[World] Enter POI',
  props<{ id: number }>()
);
export const changeLocation = createAction(
  '[World] Enter POI',
  props<{ id: number }>()
);
