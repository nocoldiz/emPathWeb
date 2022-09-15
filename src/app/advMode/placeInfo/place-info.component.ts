import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPlace } from '../../interfaces/places.interface';
import {
  loadPlace,
  loadPreviousPlace,
} from 'src/app/store/scene/scene.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss'],
})
export class PlaceInfoComponent implements OnInit {
  @Input() place: IPlace;
  @Input() reachablePlaces: IPlace[];
  clickOnPlace(newPlace: IPlace): void {
    console.log('## click on place ', newPlace);
    this.store.dispatch(loadPlace({ place: newPlace }));
  }
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
