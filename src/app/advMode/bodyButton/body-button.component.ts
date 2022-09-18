import { IBodyPart } from './../../interfaces/npc.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-body-button',
  templateUrl: './body-button.component.html',
  styleUrls: ['./body-button.component.scss'],
})
export class BodyButtonComponent implements OnInit {
  @Input() bodyPart: IBodyPart;
  @Input() label: string;
  @Input() disabled: boolean;

  ngOnInit(): void {}
}
