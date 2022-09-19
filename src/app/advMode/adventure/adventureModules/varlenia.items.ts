import { IItem } from '../../../interfaces/inventory.interface';

export let basicItems: IItem[] = [
  {
    id: 'potion',
    name: 'Unidentified potion',
    price: 100,
  },
  {
    id: 'shib',
    name: 'Scrap shib',
    attackType: 'close',
    equipRegions: ['rightHand', 'leftHand'],
  },
];
