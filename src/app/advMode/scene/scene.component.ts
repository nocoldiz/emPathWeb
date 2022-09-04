import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  getActiveAction,
  getPlace,
  getScene,
} from 'src/app/store/scene/scene.selectors';
import {
  sendAction,
  setScene,
  setText,
  updateLog,
} from 'src/app/store/scene/scene.actions';
import { IPlace } from 'src/app/interfaces/places.interface';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public sceneUpdate$ = this.store.select(getScene);
  public place$ = this.store.select(getPlace).subscribe((place: IPlace) => {
    console.log(place);
    this.store.dispatch(
      setScene({ title: place.name, text: place.description })
    );
  });
  public activeAction$ = this.store.select(getActiveAction).subscribe((id) => {
    console.log('## active action', id);
  });

  clickAction(actionId: string): void {
    console.log('## click on action ', actionId);
    this.store.dispatch(sendAction({ actionId: actionId }));
    this.store.dispatch(
      updateLog({ description: 'test', action: 'you made x' })
    );
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
