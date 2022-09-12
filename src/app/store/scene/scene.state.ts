import { IAction, ILogEntry } from '../../interfaces/events.interface';
import { IPlace } from '../../interfaces/places.interface';
export interface SceneState {
  place: IPlace;
  previousPlace: IPlace;
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
    places: [],
  },
  previousPlace: {
    id: '',
    name: '',
    description: '',
    actions: [],
    places: [],
  },
  text: '',
  log: [],
  music: '',
  centerOverlay: '',
  leftOverlay: '',
  rightOverlay: '',
  backgroundImg: 'desert-city',
  activeAction: '',
  actions: [
    {
      id: 'lit-fire',
      name: 'Lit fire',
      type: 'physical',
      cost: [{ itemId: 'wood', quantity: 1 }],
      timeout: 1000,
    },
    {
      id: 'enter-camper',
      name: 'Enter camper',
      type: 'physical',
    },
    {
      id: 'open',
      name: 'Open',
      type: 'physical',
    },
  ],
};
