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
  log: [
    {
      action: 'You open your eyes',
      text: 'You are sitting in your camper',
      id: '0',
    },
    {
      action: 'You look at the Guardian',
      text: 'Ehi you!',
      id: '1',
      name: 'Guardian',
      class: 'Keeper',
    },
  ],
  music: '',
  centerOverlay: '',
  leftOverlay: '',
  rightOverlay: '',
  backgroundImg: '',
  activeAction: '',
  actions: [],
};
