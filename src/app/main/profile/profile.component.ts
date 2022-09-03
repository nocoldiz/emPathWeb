import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogEntry } from 'src/app/interfaces/events.interface';
import { AppState } from 'src/app/store/app.state';
import { setActiveEvent, updateLog } from 'src/app/store/scene/scene.actions';
import { getLog, getScene } from 'src/app/store/scene/scene.selectors';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public log$ = this.store.select(getLog);
  public scene$ = this.store.select(getScene);
  log: Observable<LogEntry[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log(this.scene$);
    this.store.dispatch(setActiveEvent({ id: 'test' }));
    this.store.dispatch(
      updateLog({ description: 'test', action: 'you made x' })
    );
    console.log(this.scene$);
  }
}
