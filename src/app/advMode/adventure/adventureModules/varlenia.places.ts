import { IPlace } from 'src/app/interfaces/places.interface';

export let place: IPlace = {
  id: 'gas-station-0',
  name: 'Moonlit gas station parking lot',
  description: 'Test',
  actions: ['lit-fire', 'enter-camper', 'lick', 'open', 'listen'],
  places: ['bathroom', 'gas-station-store', 'parking lot'],
};

export let fixedPlaces: IPlace[] = [
  //Gas station template
  {
    id: 'ml-gas-station',
    name: 'Moonlit gas station',
    description: 'Test',
    actions: ['lit-fire', 'enter-camper', 'lick', 'open', 'listen'],
    places: ['ml-bathroom', 'ml-gas-station-store', 'ml-parking-lot'],
  },
  {
    id: 'ml-bathroom',
    name: 'Bathroom',
    description: 'Test',
    places: ['ml-gas-station', 'ml-bathroom-stall'],
  },
  {
    id: 'ml-bathroom-stall',
    name: 'Bathroom stall',
    description: 'Test',
    actions: ['piss'],
    places: ['ml-bathroom'],
  },
  {
    id: 'ml-parking-lot',
    name: 'Parking lot',
    description: 'Test',
    places: ['ml-gas-station'],
  },
  {
    id: 'ml-gas-station-store',
    name: 'Store',
    description: 'Store',
    places: ['ml-gas-station'],
  },
  {
    id: 'ml-gas-station-store',
    name: 'Bathroom',
    description: 'Test',
    places: ['ml-gas-station'],
  },
];
export let dynamicPlaces: IPlace[] = [];