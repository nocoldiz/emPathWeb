import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getLog } from 'src/app/store/scene/scene.selectors';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  @Input() logEntry: ILogEntry;
  public log$ = this.store.select(getLog);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
