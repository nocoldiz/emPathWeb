import { IInventory } from '../interfaces/inventory.interface';
import { IPlayerState } from './player/player.reducer';
import { SceneState } from './scene/scene.state';
import { sceneReducer } from './scene/scene.reducer';

export interface AppState {
  scene: SceneState;
  // player: PlayerState;
  /*
  enemy: EnemyState;
  camper: CamperState;
  party: PartyState;
  inventory: InventoryState;
*/
}

export const appReducer = {
  scene: sceneReducer,
  //player: playerReducer
};
