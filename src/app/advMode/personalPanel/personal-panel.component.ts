import { INpc } from './../../interfaces/npc.interface';
import { IAction } from '../../interfaces/events.interface';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { updateLog } from '../../store/scene/scene.actions';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './personal-panel.component.html',
  styleUrls: ['./personal-panel.component.scss'],
})
export class PersonalPanelComponent implements OnInit, OnChanges {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @Input() player: INpc;
  img: string = '';
  showActionsMenu: boolean = false;
  headActions: string[] = [];
  upperBodyActions: string[] = [];
  lowerBodyActions: string[] = [];
  leftArmActions: string[] = [];
  rightArmActions: string[] = [];
  leftLegActions: string[] = [];
  rightLegActions: string[] = [];
  rightPilonActions: string[] = [];
  leftPilonActions: string[] = [];

  clickOnAction(action: IAction): void {
    console.log('## click on action ', action);
    this.store.dispatch(
      updateLog({ logEntry: { text: 'test', action: 'you made x' } })
    );
  }
  clickOnBodyPart(bodyPart: string): void {
    console.log('## click on body part');
    //this.trigger.openMenu();
  }
  constructor(private store: Store<AppState>) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    Object.keys(this.player.bodyType).forEach((bodyPartName) => {
      console.log('## element', bodyPartName);

      this.player.bodyType[bodyPartName].organs.forEach((organ) => {
        let menuName = bodyPartName.concat('Actions');
        // Find all actions
        organ.actions.forEach((action) => {
          try {
            this[menuName].push(action);
          } catch (err) {
            console.log('Missing body part', err);
          }
        });
        // Remove duplicates
        this[menuName].filter(
          (item, index) => this[menuName].indexOf(item) === index
        );

        console.log('## element', organ);
      });
    });
    console.log(this);
  }
}
