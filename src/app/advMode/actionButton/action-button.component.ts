import { ILogEntry } from '../../interfaces/events.interface';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.html',
  styleUrls: ['./action-button.scss'],
})
export class ActionButtonComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  @Input action;
  @Output click;

  ngOnInit(): void {}
}
