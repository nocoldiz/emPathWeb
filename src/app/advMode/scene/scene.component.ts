import { IAction, ILogEntry } from '../../interfaces/events.interface';
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
  loadPlace,
  pushAction,
  sendAction,
  setScene,
  setText,
  updateLog,
} from 'src/app/store/scene/scene.actions';
import { IPlace } from 'src/app/interfaces/places.interface';
import { actions } from '../adventure/adventureModules/varlenia.actions';
import { place } from '../adventure/adventureModules/varlenia.places';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  private sceneActions = actions;
  private scenePlace = place;
  public text: string = '';
  public title: string = '';
  public img: string = '';
  public actions: IAction[] = [];

  public sceneUpdate$ = this.store.select(getScene);
  public actions$ = this.store.select(getScene);

  public place$ = this.store.select(getPlace).subscribe((place: IPlace) => {
    console.log(place);
    this.title = place.name;

    this.text = place.description;
    /*
    this.store.dispatch(
      setScene({ title: place.name, text: place.description })
    );*/
    place?.actions.forEach((actionId) => {
      let placeAction = actions.find((action) => action.id === actionId);
      this.actions.push(placeAction);
      //this.store.dispatch(pushAction({ action: placeAction }));

      console.log('place?.actions', actionId, placeAction);
    });
  });
  public activeAction$ = this.store.select(getActiveAction).subscribe((id) => {
    console.log('## active action', id);
  });

  clickOnAction(actionId: string): void {
    console.log('## click on action ', actionId);
    // this.store.dispatch(sendAction({ actionId: actionId }));
    this.store.dispatch(
      updateLog({ description: 'test', action: 'you made x' })
    );
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadPlace({
        place: this.scenePlace,
      })
    );
  }
}
