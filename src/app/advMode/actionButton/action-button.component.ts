import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAction } from 'src/app/interfaces/events.interface';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input() action: IAction;
  @Output() click: EventEmitter<string> = new EventEmitter();
  clickAction(id: string) {
    this.click.emit(id);
  }

  ngOnInit(): void {}
}
