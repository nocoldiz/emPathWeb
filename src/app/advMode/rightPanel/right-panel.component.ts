import { Component, Input, OnInit } from '@angular/core';
import { IPlace } from '../../interfaces/places.interface';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  @Input() places: IPlace[];

  constructor() {}

  ngOnInit(): void {}
}
