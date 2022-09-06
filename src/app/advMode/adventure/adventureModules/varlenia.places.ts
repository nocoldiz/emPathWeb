import { IPlace } from 'src/app/interfaces/places.interface';

export let place: IPlace = {
  id: '0',
  name: 'Moonlit gas station parking lot',
  description: 'Test',
  actions: ['lit-fire', 'enter-camper', 'lick', 'open', 'listen'],
  places: [
    {
      id: '1',
      name: 'Moonlit gas station parking lot',
      description: 'Test',
    },
    {
      id: '2',
      name: 'Store',
      description: 'Test',
    },
  ],
};
