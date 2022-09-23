import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { IPlace } from '../../interfaces/places.interface';
import {
  loadPlace,
  loadPreviousPlace,
} from 'src/app/store/scene/scene.actions';
@Component({
  selector: 'app-reachable-places',
  templateUrl: './reachable-places.component.html',
  styleUrls: ['./reachable-places.component.scss'],
})
export class ReachablePlacesComponent implements OnInit {
  @Input() currentPlace: IPlace;

  @Input() places: IPlace[];
  @Input() previousPlace: IPlace;

  constructor(private store: Store<AppState>) { }
  clickOnPlace(newPlace: IPlace): void {
    this.store.dispatch(loadPlace({ place: newPlace }));
    this.store.dispatch(loadPreviousPlace({ place: this.currentPlace }));
  }
  goBack(): void {
    this.store.dispatch(loadPlace({ place: this.previousPlace }));
    this.store.dispatch(loadPlace({ place: this.previousPlace }));
  }
  ngOnInit(): void {
  }
}
