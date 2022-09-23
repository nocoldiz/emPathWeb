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
  hint: string = '';
  selectedPart: string;
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
  validTargets: string[] = ['yourself', 'ground', 'sky', 'item', 'npc1'];

  clickOnAction(action: IAction): void {
    this.hint = 'Choose target';

    this.store.dispatch(
      updateLog({ logEntry: { text: 'test', action: 'you made x' } })
    );
  }
  clickOnBodyPart(bodyPart: string): void {
    this.selectedPart = bodyPart.concat('Actions');
    this.hint = 'Select action';

    this.trigger.openMenu();
  }
  constructor(private store: Store<AppState>) { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    let playerBody = this.player.bodyType;
    this.hint = this.player.name;
    Object.keys(playerBody).forEach((bodyPartName) => {
      playerBody[bodyPartName].organs.forEach((organ) => {
        let menuName = bodyPartName.concat('Actions');
        // Find all actions
        organ.actions.forEach((action) => {
          try {
            this[menuName].push(action);
          } catch (err) {
          }
        });
        // Remove duplicates
        this[menuName].filter(
          (item, index) => this[menuName].indexOf(item) === index
        );
      });
    });
  }
}
