import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILogEntry } from 'src/app/interfaces/events.interface';
import { AppState } from 'src/app/store/app.state';
import { place } from './adventureModules/varlenia.places';
import { actions } from './adventureModules/varlenia.actions';

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
  public actions$ = this.store.select(getActions);
  public log$ = this.store.select(getLog);
  public sceneImg$ = this.store.select(getSceneImg);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
