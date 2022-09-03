import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createReducer,
    createSelector,
    MetaReducer,
    on
} from '@ngrx/store';
import { Npc } from '../../interfaces/npc.interface';


export interface PlayerState {
    player?: Npc
}

