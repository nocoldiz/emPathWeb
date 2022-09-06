import { IAction } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { updateLog } from '../../store/scene/scene.actions';

@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
})
export class ActionsPanelComponent implements OnInit {
  @Input() actions: IAction[];
  img: string = '';

  // public actions: IAction[] = [];
  /*
  public sceneUpdate$ = this.store.select(getScene);
  public actions$ = this.store.select(getScene);

  public place$ = this.store.select(getPlace).subscribe((place: IPlace) => {
    console.log(place);
    this.title = place.name;

    this.text = place.description;
    this.store.dispatch(
      setScene({ title: place.name, text: place.description })
    );
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
*/
  clickOnAction(actionId: string): void {
    console.log('## click on action ', actionId);
    this.store.dispatch(
      updateLog({ logEntry: { text: 'test', action: 'you made x' } })
    );
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
