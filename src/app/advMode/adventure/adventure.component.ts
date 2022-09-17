import {
  getPlayer,
  getPreviousPlace,
} from './../../store/scene/scene.selectors';
import { IPlace } from 'src/app/interfaces/places.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILogEntry } from 'src/app/interfaces/events.interface';
import { AppState } from 'src/app/store/app.state';
import { fixedPlaces } from './adventureModules/varlenia.places';
import { basicActions } from './adventureModules/varlenia.actions';

import {
  loadPlace,
  setActiveEvent,
  updateLog,
  sendAction,
  setScene,
} from 'src/app/store/scene/scene.actions';
import {
  getActions,
  getActiveAction,
  getLog,
  getPlace,
  getReachablePlaces,
  getScene,
  getSceneImg,
} from 'src/app/store/scene/scene.selectors';
@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent implements OnInit {
  public place$ = this.store.select(getPlace);
  public reachablePlaces$ = this.store.select(getReachablePlaces);
  public previousPlace$ = this.store.select(getPreviousPlace);
  public player$ = this.store.select(getPlayer);

  public actions$ = this.store.select(getActions);
  public log$ = this.store.select(getLog);
  public sceneImg$ = this.store.select(getSceneImg);
  private firstScene: IPlace = {
    id: 'ml-gas-station',
    name: 'Moonlit gas station parking lot',
    description: 'Test',
    actions: ['lit-fire', 'enter-camper', 'lick', 'open', 'listen'],
    places: ['ml-bathroom', 'gas-station-store', 'parking lot'],
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlace({ place: this.firstScene }));
  }
}
