import { INpc } from '../../../interfaces/npc.interface';

export let fixedNpc: INpc[] = [
  {
    id: 'moonlit-merchant',
    name: 'Moonlit Merchant',
    hp: 100,
    canTrade: true,
  },
  {
    id: 'monkey',
    name: 'Monkey',
    hp: 10,
    isWild: true,
  },
];
