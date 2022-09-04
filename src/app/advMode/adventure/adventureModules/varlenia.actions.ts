import { IAction } from '../../../interfaces/events.interface';

export let actions: IAction[] = [
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
    id: 'loot',
    name: 'Loot this place',
    type: 'physical',
    cost: [{ atpCost: 30 }],
  },
];
