import { IAction, ILogEntry } from '../../interfaces/events.interface';
import { IPlace } from '../../interfaces/places.interface';
export interface SceneState {
  place: IPlace;
  music: string;
  centerOverlay: string;
  leftOverlay: string;
  rightOverlay: string;
  backgroundImg: string;
  text: string;
  log: ILogEntry[];
  activeAction: string;
  actions: IAction[];
}
export const initialState: SceneState = {
  place: {
    id: '0',
    name: '',
    description: '',
    actions: [],
  },
  text: '',
  log: [],
  music: '',
  centerOverlay: '',
  leftOverlay: '',
  rightOverlay: '',
  backgroundImg: '',
  activeAction: '',
  actions: [],
};
