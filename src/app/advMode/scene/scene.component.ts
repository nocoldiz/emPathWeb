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
import { sendAction, updateLog } from 'src/app/store/scene/scene.actions';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public scene$ = this.store.select(getScene);
  public place$ = this.store.select(getPlace);
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
