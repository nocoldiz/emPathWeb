import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPlace } from '../../interfaces/places.interface';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss'],
})
export class PlaceInfoComponent implements OnInit {
  @Input() place: IPlace;

  constructor() {}

  ngOnInit(): void {}
}
