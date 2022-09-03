import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setActiveEvent, updateLog } from 'src/app/store/actions/app.actions';
import { selectLog } from 'src/app/store/selectors/app.selectors'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public log$ = this.store.select(selectLog)
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setActiveEvent({ id: 'test' }));
    this.store.dispatch(updateLog({ description: 'test', action: "you made x" }));

  }

}
