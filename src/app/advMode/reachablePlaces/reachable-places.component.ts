import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reachable-places',
  templateUrl: './reachable-places.component.html',
  styleUrls: ['./reachable-places.component.scss'],
})
export class ReachablePlacesComponent implements OnInit {
  @Input() places: IPlace[];

  constructor() {}

  ngOnInit(): void {}
}
