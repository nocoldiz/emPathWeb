import { getItem } from './../../store/player/player.actions';
import {
  getNpc,
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
  getItems,
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
  public items$ = this.store.select(getItems);
  public npc$ = this.store.select(getNpc);

  public actions$ = this.store.select(getActions);
  public log$ = this.store.select(getLog);
  public sceneImg$ = this.store.select(getSceneImg);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlace({ place: fixedPlaces[0] }));
  }
}
