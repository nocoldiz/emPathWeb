import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { INpc } from '../../interfaces/npc.interface';

export interface IPlayerState {
  player?: INpc;
}
