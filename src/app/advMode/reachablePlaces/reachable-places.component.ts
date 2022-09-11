import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { IPlace } from '../../interfaces/places.interface';
import { loadPlace } from 'src/app/store/scene/scene.actions';
@Component({
  selector: 'app-reachable-places',
  templateUrl: './reachable-places.component.html',
  styleUrls: ['./reachable-places.component.scss'],
})
export class ReachablePlacesComponent implements OnInit {
  @Input() places: IPlace[];

  constructor(private store: Store<AppState>) {}
  clickOnPlace(place: IPlace): void {
    console.log('## click on place ', place);
    this.store.dispatch(loadPlace({ place: place }));
  }
  ngOnInit(): void {
    console.log('ReachablePlacesComponent', this.places);
  }
}
