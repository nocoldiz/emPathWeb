import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILogEntry } from 'src/app/interfaces/events.interface';
import { AppState } from 'src/app/store/app.state';
import {
  loadPlace,
  setActiveEvent,
  updateLog,
  sendAction,
} from 'src/app/store/scene/scene.actions';
import {
  getActiveAction,
  getLog,
  getPlace,
  getScene,
} from 'src/app/store/scene/scene.selectors';
@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent implements OnInit {
  public log$ = this.store.select(getLog);
  public scene$ = this.store.select(getScene);
  public place$ = this.store.select(getPlace);
  public activeAction$ = this.store.select(getActiveAction).subscribe((obj) => {
    console.log('## active action', obj);
  });

  log: Observable<ILogEntry[]>;

  constructor(private store: Store<AppState>) {}

  clickAction(actionId: string): void {
    console.log('## click on action ', actionId);
    this.store.dispatch(sendAction({ actionId: actionId }));
    this.store.dispatch(
      updateLog({ description: 'test', action: 'you made x' })
    );
  }

  ngOnInit(): void {
    console.log(this.scene$);
    /*
    this.store.dispatch(setActiveEvent({ id: 'test' }));
    this.store.dispatch(
      updateLog({ description: 'test', action: 'you made x' })
    );
    this.store.dispatch(
      loadPlace({ place: { id: '0', name: 'Tavern', description: 'Test' } })
    );
    console.log(this.scene$);*/
  }
}