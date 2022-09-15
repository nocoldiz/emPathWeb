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
    description: `The moonlit gas station is so far from home. The sign says "Honk if you're lonely," but nobody does. There's nothing here for anyone. It doesn't have its own name, because it's too far away from anybody else to be worth naming.
    It's the middle of nowhere, and it's always empty. Nobody comes this way, except maybe occasionally some trucker who needs a break from driving.There is a small convenience store in the gas station that sells snacks and drinks, but no fresh produce or meat. If you get hungry here, you can eat the snack foods, which are all pretty old by now. They taste like they've been there forever.
    `,
    actions: ['lit-fire', 'enter-camper', 'lick', 'open', 'listen'],
    places: ['ml-bathroom', 'ml-gas-station-store', 'ml-parking-lot'],
  },
  {
    id: 'ml-bathroom',
    name: `Bathroom`,
    description: `The bathroom door creaks loudly when you push it open and there are no lights on in the room. A single light bulb hangs from the ceiling, but it's broken and only gives off a dim glow. Inside the room, there are several stalls with doors that hang slightly crooked and have been nailed back together. The toilet paper dispenser looks like it was pulled out by an angry bear, and all the towels look like they've had their collars ripped off. There is a mirror on one wall, which has seen better days, but at least there's a sink for washing your hands. When you turn on the faucet to wash them, only a dribble comes out. `,
    places: ['ml-gas-station', 'ml-bathroom-stall'],
  },
  {
    id: 'ml-bathroom-stall',
    name: 'Bathroom stall',
    description: `There is a sign that says "please use the bathroom" and a small hand print next to it.
    If you look up, you can see the sky through the hole in the roof. It doesn't rain often here and most people don't mind the lack of privacy or having to go outside to do their business.`,
    actions: ['piss'],
    places: ['ml-bathroom'],
  },
  {
    id: 'ml-parking-lot',
    name: 'Parking lot',
    description: `The parking lot is gravel, and there's no grass anywhere around here. There isn't even any wildlife; just a few stray dogs that sometimes wander in when someone goes into the convenience store to buy food. The only plants growing in the area are weeds; the weeds don't seem to mind being alone.' `,
    places: ['ml-gas-station'],
  },
  {
    id: 'ml-gas-station-store',
    name: 'Store',
    description: `Store`,
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
