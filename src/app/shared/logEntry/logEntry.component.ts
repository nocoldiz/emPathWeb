import { Component, Input, OnInit } from '@angular/core';
import { ILogEntry } from '../../interfaces/events.interface';

@Component({
  selector: 'log-entry',
  templateUrl: './logEntry.component.html',
  styleUrls: ['./logEntry.component.scss'],
})
export class LogEntryComponent implements OnInit {
  @Input() logEntry: ILogEntry;
  constructor() {}

  ngOnInit(): void {}
}
