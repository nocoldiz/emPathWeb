import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getPlace } from 'src/app/store/scene/scene.selectors';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  @Input() logEntry: ILogEntry;
  public place$ = this.store.select(getPlace);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
