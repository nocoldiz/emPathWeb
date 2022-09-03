import {createAction, props} from '@ngrx/store'
export const damageHP = createAction(
    '[Player] Damage Hp',
    props<{ amount: number }>()
  )
  export const healHP = createAction(
    '[Player] Heal Hp',
    props<{ amount: number }>()
  )
  
  export const useMP = createAction(
    '[Player] Use MP',
    props<{ amount: number }>()
  )
  
  export const restoreMP = createAction(
    '[Player] Restore MP',
    props<{ amount: number }>()
  )
  
  export const useATP = createAction(
    '[Player] Use MP',
    props<{ amount: number }>()
  )
  
  export const restoreATP = createAction(
    '[Player] Restore ATP',
    props<{ amount: number }>()
  )
  
  // Player action
  export const craft = createAction(
    '[Player] Craft',
    props<{ item1: any, item2?: any, item3?: any }>()
  )
  export const getItem = createAction(
    '[Player] getItem',
    props<{ item: any, amount: number }>()
  )
  export const removeItem = createAction(
    '[Player] Remove Item',
    props<{ item: any, amount: number }>()
  )
  export const equipItem = createAction(
    '[Player] Equip Item',
    props<{ item: any, region: string }>()
  )
  export const unequipItem = createAction(
    '[Player] Unequip item',
    props<{ item: any}>()
  )
  
  export const unequipRegion = createAction(
    '[Player] Unequip region',
    props<{  region: string }>()
  )
  