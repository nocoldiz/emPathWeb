import {createAction, props} from '@ngrx/store'

export const loadApps = createAction(
  '[App] Load Apps'
)

export const loadAppsSuccess = createAction(
  '[App] Load Apps Success',
  props<{ data: any }>()
)

export const loadAppsFailure = createAction(
  '[App] Load Apps Failure',
  props<{ error: any }>()
)
export const unlockFeature = createAction(
  '[Game] Heal Hp',
  props<{ name: string, active: boolean }>()
)

// Player

// Camper actions
export const gatherWood = createAction(
  '[Camper] Research',
  props<{ str: number, ability: string }>()
)

export const repairSolarPanel = createAction(
  '[Camper] Repair solar panel',
  props<{ int: number, ability: string }>()
)

// World
export const enterPOI = createAction(
  '[World] Enter POI',
  props<{ id: number}>()
)
export const changeLocation = createAction(
  '[World] Enter POI',
  props<{ id: number}>()
)

//Scene
export const addImgToScene = createAction(
  '[Scene] Add image to scene',
  props<{ name: string, keywords: string[], position: -1|0|1}>()
)
export const rempveImgToScene = createAction(
  '[Scene] Add image to scene',
  props<{ name: string, keywords: string[], position: -1|0|1}>()
)
export const changeSceneBackground = createAction(
  '[Scene] Change background',
  props<{ name: string, keywords: string[]}>()
)
export const setActiveEvent = createAction(
  '[Scene] Change background',
  props<{ id: string}>()
)
export const updateLog = createAction(
  '[Log] Update log',
  props<{ description: string, action: string}>()
)
export const clearLog = createAction(
  '[Log] Clear log',
  props<{ saveLog: boolean}>()
)
export const research = createAction(
  '[Player] Research',
  props<{ int: any, subject: string }>()
)

// Resources


export const useWatt = createAction(
  '[Player] Use MP',
  props<{ amount: number }>()
)

export const gainWatt = createAction(
  '[Player] Restore ATP',
  props<{ amount: number }>()
)