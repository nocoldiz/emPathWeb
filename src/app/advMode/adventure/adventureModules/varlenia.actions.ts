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
    id: 'open',
    name: 'Open',
    type: 'physical',
  },
  {
    id: 'lockpick',
    name: 'Lockpick',
    type: 'physical',
  },
  {
    id: 'listen',
    name: 'Listen',
    type: 'intellectual',
  },
  {
    id: 'repair',
    name: 'Repair',
    type: 'intellectual',
  },
  {
    id: 'dismantle',
    name: 'Dismantle',
    type: 'intellectual',
  },
  {
    id: 'loot',
    name: 'Loot',
    type: 'physical',
    cost: [{ atpCost: 30 }],
  },
  {
    id: 'touch',
    name: 'Touch',
    type: 'physical',
    cost: [{ atpCost: 1 }],
  },
  {
    id: 'climb',
    name: 'Climb',
    type: 'physical',
    cost: [{ atpCost: 40 }],
  },
  {
    id: 'push',
    name: 'Push',
    stat: 'AGI',
    type: 'physical',
    cost: [{ atpCost: 40 }],
  },
  {
    id: 'forage',
    name: 'Forage',
    stat: 'SAG',
    type: 'physical',
    cost: [{ atpCost: 30 }],
  },
  {
    id: 'drink',
    name: 'Forage',
    type: 'physical',
    cost: [{ atpCost: 30 }],
  },
  {
    id: 'lick',
    name: 'Lick',
    type: 'physical',
    cost: [{ atpCost: 1 }],
  },
  {
    id: 'see',
    name: 'See',
    type: 'physical',
    cost: [{ atpCost: 1 }],
  },
];
